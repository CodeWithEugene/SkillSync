import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const { documentId, targetCareer, documentContent } = body;

    if (!documentId || !targetCareer || !documentContent) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update document status to processing
    await sql`
      UPDATE user_documents 
      SET processing_status = 'processing' 
      WHERE id = ${documentId} AND user_id = ${session.user.id}
    `;

    // Prepare AI prompt for skill analysis
    const prompt = `Analyze the following academic coursework/syllabus and identify transferable skills for the career path: "${targetCareer}".

Document content:
${documentContent}

Please identify:
1. Specific skills demonstrated in this coursework
2. How each skill relates to the target career
3. Evidence from the content that supports each skill
4. A confidence score (0-100) for each identified skill
5. Overall career match percentage

Return your analysis in the following JSON format:
{
  "skills": [
    {
      "name": "Skill Name",
      "category": "Programming/Data Science/Soft Skills/etc",
      "confidence": 85,
      "evidence": "Specific text or concept from the document that demonstrates this skill",
      "careerRelevance": "How this skill applies to the target career"
    }
  ],
  "careerMatch": {
    "percentage": 82,
    "reasoning": "Explanation of why this is a good/moderate/poor match",
    "missingSkills": ["Skill 1", "Skill 2"],
    "strongestMatches": ["Skill A", "Skill B"]
  },
  "learningOutcomes": [
    "Key learning outcome 1",
    "Key learning outcome 2"
  ]
}`;

    // Call AI service for analysis
    const aiResponse = await fetch("/integrations/google-gemini-2-5-pro/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        json_schema: {
          name: "skill_analysis",
          schema: {
            type: "object",
            properties: {
              skills: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    category: { type: "string" },
                    confidence: { type: "number" },
                    evidence: { type: "string" },
                    careerRelevance: { type: "string" }
                  },
                  required: ["name", "category", "confidence", "evidence", "careerRelevance"],
                  additionalProperties: false
                }
              },
              careerMatch: {
                type: "object",
                properties: {
                  percentage: { type: "number" },
                  reasoning: { type: "string" },
                  missingSkills: {
                    type: "array",
                    items: { type: "string" }
                  },
                  strongestMatches: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["percentage", "reasoning", "missingSkills", "strongestMatches"],
                additionalProperties: false
              },
              learningOutcomes: {
                type: "array",
                items: { type: "string" }
              }
            },
            required: ["skills", "careerMatch", "learningOutcomes"],
            additionalProperties: false
          }
        }
      }),
    });

    if (!aiResponse.ok) {
      throw new Error("AI analysis failed");
    }

    const aiResult = await aiResponse.json();
    const analysisData = JSON.parse(aiResult.choices[0].message.content);

    // Find or create career path
    let careerPath = await sql`
      SELECT id FROM career_paths WHERE name = ${targetCareer}
    `;
    
    let careerPathId = null;
    if (careerPath.length === 0) {
      const newCareerPath = await sql`
        INSERT INTO career_paths (name, description)
        VALUES (${targetCareer}, ${`Career path for ${targetCareer}`})
        RETURNING id
      `;
      careerPathId = newCareerPath[0].id;
    } else {
      careerPathId = careerPath[0].id;
    }

    // Create skill analysis record
    const analysis = await sql`
      INSERT INTO skill_analyses (
        user_id, document_id, target_career_path, target_career_name, 
        extracted_skills, career_match_percentage, ai_processing_log
      )
      VALUES (
        ${session.user.id}, ${documentId}, ${careerPathId}, ${targetCareer},
        ${JSON.stringify(analysisData)}, ${analysisData.careerMatch.percentage}, 
        ${JSON.stringify(aiResult)}
      )
      RETURNING *
    `;

    const analysisId = analysis[0].id;

    // Insert individual identified skills
    for (const skill of analysisData.skills) {
      // Try to find existing skill in database
      let existingSkill = await sql`
        SELECT id FROM skills WHERE name = ${skill.name}
      `;

      let skillId = null;
      if (existingSkill.length === 0) {
        // Create new skill if it doesn't exist
        const newSkill = await sql`
          INSERT INTO skills (name, category, description)
          VALUES (${skill.name}, ${skill.category}, ${skill.careerRelevance})
          RETURNING id
        `;
        skillId = newSkill[0].id;
      } else {
        skillId = existingSkill[0].id;
      }

      // Insert identified skill
      await sql`
        INSERT INTO identified_skills (
          analysis_id, skill_id, skill_name, confidence_score, 
          evidence_text, badge_earned
        )
        VALUES (
          ${analysisId}, ${skillId}, ${skill.name}, ${skill.confidence},
          ${skill.evidence}, ${skill.confidence >= 70}
        )
      `;
    }

    // Update document status to completed
    await sql`
      UPDATE user_documents 
      SET processing_status = 'completed', analysis_results = ${JSON.stringify(analysisData)}
      WHERE id = ${documentId}
    `;

    return new Response(JSON.stringify({
      success: true,
      analysis: {
        id: analysisId,
        skills: analysisData.skills,
        careerMatch: analysisData.careerMatch,
        learningOutcomes: analysisData.learningOutcomes
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Skill analysis error:", error);
    
    // Update document status to failed if we have the documentId
    const body = await request.json().catch(() => ({}));
    if (body.documentId) {
      await sql`
        UPDATE user_documents 
        SET processing_status = 'failed' 
        WHERE id = ${body.documentId}
      `.catch(console.error);
    }

    return new Response(JSON.stringify({ error: "Analysis failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
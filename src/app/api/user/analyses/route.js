import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get user's skill analyses with document and skill information
    const analyses = await sql`
      SELECT 
        sa.id,
        sa.target_career_name,
        sa.career_match_percentage,
        sa.analysis_date,
        sa.extracted_skills,
        ud.filename,
        ud.file_type,
        ud.processing_status,
        COUNT(iss.id) as total_skills,
        COUNT(CASE WHEN iss.badge_earned = true THEN 1 END) as badges_earned
      FROM skill_analyses sa
      JOIN user_documents ud ON sa.document_id = ud.id
      LEFT JOIN identified_skills iss ON sa.id = iss.analysis_id
      WHERE sa.user_id = ${session.user.id}
      GROUP BY sa.id, sa.target_career_name, sa.career_match_percentage, sa.analysis_date, 
               sa.extracted_skills, ud.filename, ud.file_type, ud.processing_status
      ORDER BY sa.analysis_date DESC
    `;

    const formattedAnalyses = analyses.map(analysis => ({
      id: analysis.id,
      targetCareer: analysis.target_career_name,
      careerMatchPercentage: analysis.career_match_percentage,
      analysisDate: analysis.analysis_date,
      document: {
        filename: analysis.filename,
        fileType: analysis.file_type,
        status: analysis.processing_status
      },
      totalSkills: parseInt(analysis.total_skills),
      badgesEarned: parseInt(analysis.badges_earned),
      extractedSkills: analysis.extracted_skills
    }));

    return new Response(JSON.stringify({
      success: true,
      analyses: formattedAnalyses
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Get analyses error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch analyses" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
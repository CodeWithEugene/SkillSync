import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { updateDocumentStatus, createExtractedSkill } from "@/lib/db"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {
    const { documentId } = await req.json()
    console.log('[ANALYZE] Starting analysis for document:', documentId)

    if (!documentId) {
      return NextResponse.json({ error: "Document ID required" }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    // Get document
    console.log('[ANALYZE] Fetching document from database...')
    const { data: document, error: docError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .single()

    if (docError || !document) {
      console.error('[ANALYZE] Document not found:', docError)
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }
    console.log('[ANALYZE] Document found:', document.filename)

    // Download file content
    console.log('[ANALYZE] Downloading file from:', document.fileUrl)
    const fileUrl = document.fileUrl
    const response = await fetch(fileUrl)
    
    if (!response.ok) {
      console.error('[ANALYZE] Failed to download file:', response.status, response.statusText)
      await updateDocumentStatus(documentId, 'FAILED')
      return NextResponse.json({ error: "Failed to download file" }, { status: 500 })
    }
    console.log('[ANALYZE] File downloaded successfully')

    // Extract text from file (for now, we'll handle text files and PDFs)
    let fileContent = ''
    const contentType = response.headers.get('content-type') || ''

    if (contentType.includes('text/') || document.filename.endsWith('.txt')) {
      fileContent = await response.text()
    } else if (contentType.includes('pdf') || document.filename.endsWith('.pdf')) {
      // For PDFs, we'll need to extract text - for now, return error
      // In production, you'd use a PDF parsing library
      await updateDocumentStatus(documentId, 'FAILED')
      return NextResponse.json({ 
        error: "PDF parsing not yet implemented. Please upload text files for now." 
      }, { status: 400 })
    } else {
      // Try to read as text
      fileContent = await response.text()
    }

    if (!fileContent || fileContent.length < 100) {
      await updateDocumentStatus(documentId, 'FAILED')
      return NextResponse.json({ error: "File content too short or empty" }, { status: 400 })
    }

    // Use DeepSeek API to extract skills
    const prompt = `Analyze the following academic coursework document and extract technical skills, soft skills, and competencies mentioned. 

Return a JSON array of skills with this exact format:
[
  {
    "skillName": "Name of the skill",
    "category": "Technical" or "Soft" or "Domain",
    "confidenceScore": 0.0 to 1.0,
    "evidenceText": "Exact quote or context from the document showing this skill"
  }
]

Focus on:
- Programming languages, frameworks, tools
- Technical methodologies and processes
- Soft skills like communication, teamwork, leadership
- Domain-specific knowledge
- Certifications or qualifications mentioned

Document content:
${fileContent.substring(0, 15000)}` // Limit to avoid token limits

    try {
      // Initialize Gemini AI
      console.log('[ANALYZE] Initializing Gemini AI...')
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      const fullPrompt = `You are an expert at analyzing academic coursework and extracting skills. Always return valid JSON arrays.

${prompt}`

      console.log('[ANALYZE] Sending request to Gemini API...')
      const result = await model.generateContent(fullPrompt)
      const response = await result.response
      const content = response.text() || '[]'
      console.log('[ANALYZE] Received response from Gemini API')
      
      // Parse JSON response
      let skills: any[] = []
      try {
        // Extract JSON from markdown code blocks if present
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          skills = JSON.parse(jsonMatch[0])
        } else {
          skills = JSON.parse(content)
        }
      } catch (parseError) {
        console.error("Failed to parse skills JSON:", content)
        await updateDocumentStatus(documentId, 'FAILED')
        return NextResponse.json({ 
          error: "Failed to parse AI response",
          rawResponse: content.substring(0, 500)
        }, { status: 500 })
      }

      // Save extracted skills
      console.log('[ANALYZE] Saving', skills.length, 'extracted skills...')
      const savedSkills = []
      for (const skill of skills) {
        if (skill.skillName && skill.category && skill.confidenceScore !== undefined) {
          try {
            const saved = await createExtractedSkill({
              userId: document.userId,
              documentId: document.id,
              skillName: skill.skillName,
              category: skill.category,
              confidenceScore: parseFloat(skill.confidenceScore) || 0.5,
              evidenceText: skill.evidenceText || '',
            })
            savedSkills.push(saved)
          } catch (err) {
            console.error("[ANALYZE] Failed to save skill:", err)
          }
        }
      }

      // Update document status
      console.log('[ANALYZE] Updating document status to COMPLETED')
      await updateDocumentStatus(documentId, 'COMPLETED')

      console.log('[ANALYZE] Analysis complete! Extracted', savedSkills.length, 'skills')
      return NextResponse.json({
        success: true,
        skillsExtracted: savedSkills.length,
        skills: savedSkills,
      })
    } catch (aiError: any) {
      console.error("AI analysis error:", aiError)
      await updateDocumentStatus(documentId, 'FAILED')
      return NextResponse.json({
        error: "AI analysis failed",
        details: aiError.message,
      }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Analysis error:", error)
    return NextResponse.json({
      error: "Failed to analyze document",
      details: error.message,
    }, { status: 500 })
  }
}



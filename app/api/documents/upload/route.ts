import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { getCurrentUser } from "@/lib/supabase-auth"
import { createDocument } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    const filename = formData.get("filename") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload to Supabase Storage
    const supabase = await createServerSupabaseClient()
    const fileExt = file.name.split('.').pop()
    const filePath = `${user.id}/${Date.now()}-${filename || file.name}`

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('coursework')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error("Upload error:", uploadError)
      return NextResponse.json(
        { error: "Failed to upload file", details: uploadError.message },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('coursework')
      .getPublicUrl(filePath)

    // Create document record in database
    const document = await createDocument({
      userId: user.id,
      filename: filename || file.name,
      fileUrl: urlData.publicUrl,
      status: 'PROCESSING',
    })

    // Trigger analysis in background (don't wait for it)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/documents/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId: document.id }),
    }).catch(err => console.error('Failed to trigger analysis:', err))

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        filename: document.filename,
        status: document.status,
        uploadDate: document.uploadDate,
      },
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload document", details: error.message },
      { status: 500 }
    )
  }
}


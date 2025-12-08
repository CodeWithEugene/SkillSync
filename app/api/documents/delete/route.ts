import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { getCurrentUser } from "@/lib/supabase-auth"

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { documentId } = await req.json()

    if (!documentId) {
      return NextResponse.json({ error: "Document ID required" }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    // Get document to verify ownership and get file path
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('userId', user.id)
      .single()

    if (fetchError || !document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    // Extract file path from URL
    const urlParts = document.fileUrl.split('/coursework/')
    const filePath = urlParts[1]?.split('?')[0]

    // Delete from storage
    if (filePath) {
      const { error: storageError } = await supabase.storage
        .from('coursework')
        .remove([filePath])

      if (storageError) {
        console.error("Storage deletion error:", storageError)
      }
    }

    // Delete extracted skills
    await supabase
      .from('extracted_skills')
      .delete()
      .eq('documentId', documentId)

    // Delete document record
    const { error: deleteError } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId)
      .eq('userId', user.id)

    if (deleteError) {
      return NextResponse.json(
        { error: "Failed to delete document", details: deleteError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete document", details: error.message },
      { status: 500 }
    )
  }
}

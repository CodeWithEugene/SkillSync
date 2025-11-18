import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/supabase-auth"
import { getDocuments } from "@/lib/db"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const documents = await getDocuments(user.id)

    return NextResponse.json({
      success: true,
      documents,
    })
  } catch (error: any) {
    console.error("Failed to fetch documents:", error)
    return NextResponse.json(
      { error: "Failed to fetch documents", details: error.message },
      { status: 500 }
    )
  }
}



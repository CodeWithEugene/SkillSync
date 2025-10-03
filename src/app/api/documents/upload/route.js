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
    const { filename, fileUrl, fileType } = body;

    if (!filename || !fileUrl || !fileType) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Insert document into database
    const result = await sql`
      INSERT INTO user_documents (user_id, filename, file_url, file_type, processing_status)
      VALUES (${session.user.id}, ${filename}, ${fileUrl}, ${fileType}, 'pending')
      RETURNING *
    `;

    const document = result[0];

    return new Response(JSON.stringify({ 
      success: true, 
      document: {
        id: document.id,
        filename: document.filename,
        fileType: document.file_type,
        uploadDate: document.upload_date,
        status: document.processing_status
      }
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Document upload error:", error);
    return new Response(JSON.stringify({ error: "Failed to save document" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
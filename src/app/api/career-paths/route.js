import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    let careerPaths;
    
    if (search) {
      careerPaths = await sql`
        SELECT id, name, description
        FROM career_paths
        WHERE name ILIKE ${'%' + search + '%'}
        ORDER BY name
        LIMIT 10
      `;
    } else {
      careerPaths = await sql`
        SELECT id, name, description
        FROM career_paths
        ORDER BY name
        LIMIT 20
      `;
    }

    return new Response(JSON.stringify({
      success: true,
      careerPaths: careerPaths.map(cp => ({
        id: cp.id,
        name: cp.name,
        description: cp.description
      }))
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Get career paths error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch career paths" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { registerSchema } from "@/lib/validations"

/**
 * This route is kept for backward compatibility, but registration
 * is now handled directly via Supabase Auth in the register page.
 * Supabase Auth automatically creates users in auth.users table.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = registerSchema.parse(body)

    const supabase = await createServerSupabaseClient()

    // Create user via Supabase Auth
    // Note: Supabase will return an error if user already exists
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
      // Check if error is due to existing user
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        user: { 
          id: data.user?.id, 
          name: data.user?.user_metadata?.name || name, 
          email: data.user?.email 
        } 
      },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    )
  }
}

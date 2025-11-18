import { createServerSupabaseClient } from './supabase-server'

/**
 * Get the current authenticated user from Supabase Auth
 * Use this in Server Components and API routes
 */
export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  // Return user data from Supabase Auth
  return {
    id: user.id,
    name: user.user_metadata?.name || user.email?.split('@')[0] || null,
    email: user.email!,
    image: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
    bio: null,
    portfolioPublic: false,
  }
}

/**
 * Require authentication - throws error if user is not authenticated
 * Use this in protected API routes
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

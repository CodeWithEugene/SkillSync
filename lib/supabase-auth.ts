import { createServerSupabaseClient } from './supabase-server'
import { prisma } from './db'

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

  // Sync with Prisma User table
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      portfolioPublic: true,
    }
  })

  // If user doesn't exist in Prisma, create it
  if (!dbUser) {
    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.name || user.email?.split('@')[0] || null,
        emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : null,
        image: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        portfolioPublic: true,
      }
    })
    return newUser
  }

  // Update user if needed
  if (dbUser.id !== user.id) {
    await prisma.user.update({
      where: { email: user.email! },
      data: {
        id: user.id,
        emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : null,
      }
    })
  }

  return dbUser
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


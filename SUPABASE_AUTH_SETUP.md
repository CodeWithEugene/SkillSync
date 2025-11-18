# Supabase Authentication Setup

## Overview

Authentication has been successfully migrated from NextAuth.js to Supabase Auth. The application now uses Supabase's built-in authentication system, which provides:

- Email/Password authentication
- OAuth providers (Google, GitHub)
- Secure session management
- Automatic user synchronization with Prisma

## What Was Changed

### 1. Supabase Client Configuration (`lib/supabase.ts`)
- Added server-side Supabase client using `@supabase/ssr`
- Created `createServerSupabaseClient()` function for use in Server Components and API routes
- Maintained client-side Supabase client for use in Client Components

### 2. Authentication Helpers (`lib/supabase-auth.ts`)
- Created `getCurrentUser()` function to get the authenticated user
- Created `requireAuth()` function for protected API routes
- Automatic synchronization between Supabase Auth users and Prisma User table

### 3. Middleware (`middleware.ts`)
- Added Next.js middleware to refresh Supabase sessions automatically
- Ensures sessions stay valid across page navigations

### 4. Login Page (`app/(auth)/login/page.tsx`)
- Updated to use `supabase.auth.signInWithPassword()`
- OAuth buttons now use `supabase.auth.signInWithOAuth()`
- Removed NextAuth dependencies

### 5. Register Page (`app/(auth)/register/page.tsx`)
- Updated to use `supabase.auth.signUp()`
- Users are automatically created in Supabase Auth
- User metadata (name) is stored in Supabase Auth

### 6. Register API Route (`app/api/auth/register/route.ts`)
- Updated to use Supabase Auth (kept for backward compatibility)
- Registration is now primarily handled client-side

### 7. Dashboard Layout (`app/(dashboard)/layout.tsx`)
- Updated to use `getCurrentUser()` from Supabase Auth
- Added logout button component

### 8. Dashboard Page (`app/(dashboard)/dashboard/page.tsx`)
- Updated to use Supabase Auth instead of NextAuth

### 9. Logout Component (`components/auth/logout-button.tsx`)
- New component for signing out users
- Uses `supabase.auth.signOut()`

## How It Works

1. **User Registration**: When a user registers, Supabase Auth creates the user in the `auth.users` table
2. **User Sync**: The `getCurrentUser()` function automatically syncs Supabase Auth users with the Prisma `User` table
3. **Session Management**: Supabase handles session management via secure HTTP-only cookies
4. **Authentication Check**: Server Components use `getCurrentUser()` to check authentication status

## Environment Variables Required

Make sure these are set in your `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

## Next Steps

1. **Enable OAuth Providers** (if needed):
   - Go to Supabase Dashboard > Authentication > Providers
   - Enable Google and/or GitHub
   - Add OAuth credentials

2. **Configure Email Templates** (optional):
   - Go to Supabase Dashboard > Authentication > Email Templates
   - Customize confirmation and password reset emails

3. **Set Up Redirect URLs**:
   - In Supabase Dashboard > Authentication > URL Configuration
   - Add your production URL to allowed redirect URLs

4. **Test Authentication**:
   - Try registering a new user
   - Test login/logout
   - Verify OAuth flows (if enabled)

## Migration Notes

- NextAuth.js is still installed but no longer used for authentication
- The Prisma `User` table is synced with Supabase Auth users
- Existing NextAuth sessions will not work - users need to log in again
- The `auth.users` table in Supabase is managed by Supabase Auth

## Security Features

- ✅ Secure password hashing (handled by Supabase)
- ✅ Session management via HTTP-only cookies
- ✅ Automatic session refresh via middleware
- ✅ Row Level Security (RLS) can be enabled on database tables
- ✅ OAuth support for Google and GitHub

## Troubleshooting

**Users can't log in:**
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly
- Verify the user exists in Supabase Dashboard > Authentication > Users

**OAuth not working:**
- Ensure OAuth providers are enabled in Supabase Dashboard
- Check that redirect URLs are configured correctly
- Verify OAuth credentials are set up

**Session not persisting:**
- Check that middleware is working (should be in `middleware.ts`)
- Verify cookies are being set (check browser DevTools)

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase SSR Guide](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)


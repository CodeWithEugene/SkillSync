# Vercel Environment Variables Setup

## Issue: "Invalid API Key" Error

If you're getting an "invalid api key" error when trying to sign up or log in, it means the Supabase anon key in Vercel doesn't match your Supabase project.

## Solution

### Step 1: Get Your Correct Supabase Keys

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/owonfwuyrqwywgsjxrcl
2. Navigate to **Settings** > **API**
3. Copy the following:
   - **Project URL**: `https://owonfwuyrqwywgsjxrcl.supabase.co`
   - **anon/public key**: This is the key that starts with `eyJ...`

### Step 2: Update Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Update or add these variables:

   **For Production:**
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://owonfwuyrqwywgsjxrcl.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `[Your anon key from Supabase Dashboard]`

   **For Preview and Development (optional but recommended):**
   - Add the same variables for Preview and Development environments

### Step 3: Verify the Key Format

The anon key should:
- Start with `eyJ` (it's a JWT token)
- Be quite long (usually 200+ characters)
- Look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93b25md3V5cnF3eXdnc2p4cmNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NzQzMTIsImV4cCI6MjA3NTA1MDMxMn0.qZdrYaI33xudf8pnANcvgzKuXQGKhQTxwYeFkpsh3js`

### Step 4: Redeploy

After updating the environment variables:
1. Go to **Deployments** tab in Vercel
2. Click the three dots on the latest deployment
3. Select **Redeploy**
4. Or push a new commit to trigger a new deployment

### Step 5: Test the Configuration

Visit: `https://skill-sync-platform.vercel.app/api/auth/test`

This endpoint will show you:
- If the environment variables are set
- If the key format is valid
- If the connection to Supabase works

## Common Issues

### Issue: Key is set but still getting "invalid api key"

**Solution:**
- Make sure you're using the **anon/public** key, NOT the **service_role** key
- The service_role key should NEVER be exposed in client-side code
- Double-check there are no extra spaces or line breaks in the key

### Issue: Key works locally but not on Vercel

**Solution:**
- Environment variables in Vercel are case-sensitive
- Make sure the variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check that you've selected the correct environment (Production/Preview/Development)

### Issue: Key was rotated/changed

**Solution:**
- If you rotated your Supabase keys, you need to update them in Vercel
- Old keys will stop working immediately after rotation

## Additional Configuration

### Supabase Redirect URLs

Make sure your Supabase project allows redirects to your Vercel domain:

1. Go to Supabase Dashboard > **Authentication** > **URL Configuration**
2. Add to **Redirect URLs**:
   - `https://skill-sync-platform.vercel.app/**`
   - `https://skill-sync-platform.vercel.app/dashboard`
   - `https://skill-sync-platform.vercel.app/auth/login`

### Email Confirmation (Optional)

If email confirmation is enabled:
1. Go to Supabase Dashboard > **Authentication** > **Settings**
2. You can disable "Enable email confirmations" for testing
3. Or configure SMTP settings for production emails

## Verification

After setup, test by:
1. Visiting the test endpoint: `/api/auth/test`
2. Trying to register a new account
3. Checking browser console for any errors

If everything is configured correctly, you should be able to sign up and log in without errors.


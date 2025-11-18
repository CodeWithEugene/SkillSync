# Supabase Setup for SkillSync

## Quick Setup

Your Supabase project is already configured! Follow these steps:

### 1. Get Your Database Password

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/owonfwuyrqwywgsjxrcl)
2. Go to **Settings** > **Database**
3. Copy your database password (or reset it if needed)

### 2. Update Environment Variables

Create a `.env` file with your database password:

```bash
# Replace YOUR_PASSWORD with your actual Supabase database password
DATABASE_URL="postgresql://postgres.owonfwuyrqwywgsjxrcl:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.owonfwuyrqwywgsjxrcl:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL="https://owonfwuyrqwywgsjxrcl.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93b25md3V5cnF3eXdnc2p4cmNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NzQzMTIsImV4cCI6MjA3NTA1MDMxMn0.qZdrYaI33xudf8pnANcvgzKuXQGKhQTxwYeFkpsh3js"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# DeepSeek AI (already configured)
OPENAI_API_KEY="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"
OPENAI_BASE_URL="https://api.deepseek.com"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

### 3. Push Database Schema to Supabase

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push
```

This will create all the necessary tables in your Supabase database.

### 4. Run the App

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Vercel Deployment

When deploying to Vercel, add these environment variables:

1. Go to your Vercel project settings
2. Add all environment variables from your `.env` file
3. Make sure to include:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET`
   - `OPENAI_API_KEY`
   - `OPENAI_BASE_URL`

## Supabase Features Available

✅ **PostgreSQL Database** - Fully managed with connection pooling
✅ **Authentication** - Using NextAuth.js with Prisma adapter
✅ **File Storage** - Can use Supabase Storage for document uploads
✅ **Real-time** - Available if needed for live updates
✅ **Edge Functions** - Can be used for serverless functions

## Database Connection Notes

- **DATABASE_URL** uses connection pooling (port 6543) - for Prisma migrations and serverless
- **DIRECT_URL** uses direct connection (port 5432) - for Prisma migrations
- Both are required for optimal performance on Vercel

## Next Steps

1. ✅ Database is configured
2. ✅ Authentication is set up
3. ✅ DeepSeek AI is ready
4. ⏳ Add OAuth providers (optional)
5. ⏳ Configure Supabase Storage for file uploads
6. ⏳ Deploy to Vercel

## Supabase Storage Setup (Optional)

To use Supabase for document storage instead of AWS S3:

1. Go to **Storage** in Supabase Dashboard
2. Create a new bucket called `coursework`
3. Set appropriate policies for authenticated users
4. Update the document upload code to use Supabase Storage

Example code:
```typescript
import { supabase } from '@/lib/supabase'

// Upload file
const { data, error } = await supabase.storage
  .from('coursework')
  .upload(`${userId}/${filename}`, file)
```

## Troubleshooting

**Can't connect to database?**
- Make sure your database password is correct
- Check that your IP is allowed (Supabase allows all by default)
- Verify the connection strings are correct

**Prisma errors?**
- Run `npx prisma generate` after any schema changes
- Use `npx prisma db push` to sync schema with database
- Check `npx prisma studio` to view your database

**Build fails on Vercel?**
- Ensure all environment variables are set
- The `postinstall` script will run `prisma generate` automatically

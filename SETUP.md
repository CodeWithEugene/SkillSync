# SkillSync Setup Guide

## Quick Start

Follow these steps to get SkillSync running:

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

The DeepSeek API key is already included. You need to add:

- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- (Optional) Google/GitHub OAuth credentials

### 3. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed with sample career paths
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Database Setup Options

### Option 1: Local PostgreSQL

Install PostgreSQL locally and create a database:

```bash
createdb skillsync
```

Then use this connection string in `.env`:
```
DATABASE_URL="postgresql://username:password@localhost:5432/skillsync"
```

### Option 2: Vercel Postgres

1. Create a Vercel Postgres database
2. Copy the connection string to `.env`

### Option 3: Supabase

1. Create a Supabase project
2. Get the connection string from Settings > Database
3. Add to `.env`

## OAuth Setup (Optional)

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add credentials to `.env`

### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Add credentials to `.env`

## Testing the App

1. Register a new account at `/auth/register`
2. Login at `/auth/login`
3. Explore the dashboard

## Current Status

✅ Authentication (email/password, Google, GitHub)
✅ Database schema
✅ Dashboard layout
✅ Dark theme UI
⏳ Document upload (placeholder)
⏳ AI skill extraction (needs implementation)
⏳ Career matching (needs implementation)
⏳ Portfolio generation (needs implementation)

## Next Development Steps

1. Implement document upload with AWS S3/Vercel Blob
2. Create AI skill extraction API endpoint
3. Build career matching algorithm
4. Add skill verification UI
5. Implement portfolio PDF generation

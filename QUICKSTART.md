# SkillSync - Quick Start Guide

## 🚀 Get Running in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment

Create `.env` file:
```bash
cp .env.example .env
```

**Required:** Add your Supabase database password to `.env`:
```env
DATABASE_URL="postgresql://postgres.owonfwuyrqwywgsjxrcl:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.owonfwuyrqwywgsjxrcl:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

Get your password from: [Supabase Dashboard](https://supabase.com/dashboard/project/owonfwuyrqwywgsjxrcl/settings/database)

**Required:** Generate NextAuth secret:
```bash
openssl rand -base64 32
```
Add it to `.env`:
```env
NEXTAUTH_SECRET="your-generated-secret"
```

### Step 3: Setup Database & Run
```bash
npx prisma db push
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## ✅ What's Already Configured

- ✅ Supabase database connection
- ✅ DeepSeek AI API key
- ✅ NextAuth.js authentication
- ✅ Dark theme UI
- ✅ All pages and routing

## 📦 What You Need

1. **Supabase database password** - Get from Supabase dashboard
2. **NextAuth secret** - Generate with `openssl rand -base64 32`
3. (Optional) Google/GitHub OAuth credentials

## 🎯 First Time Using the App

1. Go to [http://localhost:3000](http://localhost:3000)
2. Click "Get Started"
3. Register with email/password
4. Login and explore the dashboard

## 📚 Documentation

- **Full Setup**: See `SUPABASE_SETUP.md`
- **Project Info**: See `README.md`
- **Supabase Dashboard**: [https://supabase.com/dashboard/project/owonfwuyrqwywgsjxrcl](https://supabase.com/dashboard/project/owonfwuyrqwywgsjxrcl)

## 🐛 Common Issues

**"Can't connect to database"**
→ Check your database password in `.env`

**"Invalid session"**
→ Make sure `NEXTAUTH_SECRET` is set in `.env`

**"Prisma Client not generated"**
→ Run `npx prisma generate`

## 🚢 Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables from `.env`
4. Deploy!

The `postinstall` script will automatically run `prisma generate` during build.

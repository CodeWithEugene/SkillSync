# SkillSync

An AI-powered web application that analyzes academic coursework and maps them to real-world industry skills.

## Features

- **Authentication**: Secure login with email/password, Google, and GitHub
- **Document Upload**: Upload syllabi, assignments, and notes
- **AI Skill Extraction**: Automatically extract skills from coursework using DeepSeek AI
- **Career Matching**: Get matched with career paths based on your skills
- **Public Portfolio**: Shareable portfolio showcasing verified skills
- **Dark Theme**: Modern slate-based dark UI

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **AI**: DeepSeek API (OpenAI-compatible)
- **File Storage**: AWS S3 or Vercel Blob

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- DeepSeek API key (provided)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URL and other credentials.

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Protected dashboard pages
│   ├── api/             # API routes
│   └── globals.css      # Global styles
├── components/
│   └── ui/              # Reusable UI components
├── lib/
│   ├── auth.ts          # NextAuth configuration
│   ├── db.ts            # Prisma client
│   ├── openai.ts        # DeepSeek API client
│   └── validations.ts   # Zod schemas
└── prisma/
    └── schema.prisma    # Database schema
```

## API Key

The DeepSeek API key is pre-configured in `.env.example`:
```
OPENAI_API_KEY="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"
OPENAI_BASE_URL="https://api.deepseek.com"
```

## Next Steps

1. Implement document upload functionality
2. Add AI skill extraction endpoint
3. Build career matching algorithm
4. Create skill verification system
5. Implement portfolio PDF generation

## License

MIT

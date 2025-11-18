# SkillSync

Transform your academic coursework into industry-recognized skills with AI-powered analysis and career matching.

## 🚀 Features

### Core Functionality
- **Smart Document Analysis**: Upload syllabi, assignments, and academic notes for AI-powered skill extraction
- **Career Path Discovery**: Get personalized career recommendations based on your extracted skills
- **Skills Portfolio**: Build and share a professional portfolio showcasing your verified abilities
- **Progress Tracking**: Monitor your skill development and career readiness over time

### User Experience
- **Modern UI**: Sleek glassmorphism design with dark theme
- **Mobile Optimized**: Fully responsive design that works beautifully on all devices
- **Secure Authentication**: Multiple sign-in options including email, Google, and GitHub
- **Real-time Updates**: Live feedback on document processing and skill verification

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom glassmorphism components
- **UI Components**: shadcn/ui for consistent design system
- **State Management**: Zustand for global state

### Backend & Database
- **Runtime**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with multiple providers
- **File Storage**: Supabase Storage for document uploads

### AI & Analytics
- **AI Processing**: Advanced language models for skill extraction
- **Career Matching**: Semantic similarity algorithms for job recommendations
- **Data Validation**: Smart confidence scoring for extracted skills

## 🎨 Design System

### Visual Identity
- **Color Scheme**: Pure black (#000000) and white (#FFFFFF) for maximum contrast
- **Typography**: Modern, readable fonts with responsive scaling
- **Effects**: Glassmorphism with backdrop blur and subtle animations
- **Icons**: Lucide React icons for consistency

### Responsive Design
- **Mobile First**: Optimized for touch interfaces and small screens
- **Breakpoints**: Tailored layouts for mobile, tablet, and desktop
- **Navigation**: Collapsible mobile menu with smooth animations
- **Touch Targets**: All interactive elements meet accessibility standards

## 📱 Pages & Features

### Public Pages
- **Landing Page**: Hero section with feature highlights and call-to-action
- **Authentication**: Clean login and registration forms with OAuth options

### Dashboard (Protected)
- **Overview**: Stats dashboard with quick actions and recent activity
- **Documents**: Upload and manage academic coursework files
- **Skills**: View extracted skills with verification status and confidence scores
- **Careers**: Explore recommended career paths with match percentages
- **Portfolio**: Public-facing skills showcase with PDF export
- **Profile**: Account settings and personal information management

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Modern web browser

### Quick Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd skillsync
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration values.

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Deployment

The application is optimized for deployment on Vercel:

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard
   - Deploy automatically on push to main branch

## 📁 Project Structure

```
skillsync/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, register)
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (buttons, cards, inputs)
│   ├── auth/             # Authentication-specific components
│   └── dashboard/        # Dashboard-specific components
├── lib/                  # Utility functions and configurations
│   ├── supabase.ts       # Supabase client configuration
│   ├── supabase-auth.ts  # Authentication helpers
│   ├── utils.ts          # General utility functions
│   └── validations.ts    # Form validation schemas
├── public/               # Static assets (favicon, images)
└── types/                # TypeScript type definitions
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Consistent code formatting and best practices
- **Tailwind CSS**: Utility-first styling with custom components

### Performance Optimizations
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Optimized caching strategies for static and dynamic content
- **Bundle Analysis**: Regular bundle size monitoring

## 🎯 Roadmap

### Phase 1: Core Features ✅
- User authentication and profile management
- Document upload and storage
- Basic UI/UX with responsive design

### Phase 2: AI Integration 🚧
- Skill extraction from documents
- Confidence scoring and validation
- Career matching algorithms

### Phase 3: Advanced Features 📋
- Portfolio PDF generation
- Skills verification system
- Advanced analytics and insights
- Integration with job boards

### Phase 4: Community Features 📋
- Skill sharing and collaboration
- Peer verification system
- Industry insights and trends

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on:
- Code style and standards
- Pull request process
- Issue reporting
- Feature requests

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Next.js and the React ecosystem
- UI components powered by shadcn/ui
- Styling with Tailwind CSS
- Database and authentication by Supabase
- Icons by Lucide React

---

**SkillSync** - Bridging the gap between academic learning and industry readiness.
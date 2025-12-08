import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const summary = {
  name: 'Eugene Mutembei',
  headline: 'Frontend Developer & UI/UX Designer',
  location: 'Nairobi, Kenya',
  blurb: 'Shipping performant React/Next.js experiences with clean UI systems and API-first integrations.',
}

const featuredSkills = ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Tailwind', 'AWS Amplify', 'Figma', 'Accessibility']

const projects = [
  {
    title: 'Adamur Platform UI',
    impact: 'Improved interactivity by 35% through cleaner UX and faster flows',
    details: 'Built scalable Next.js + TypeScript frontends with AWS Amplify auth and deployments.',
    tags: ['Next.js', 'TypeScript', 'AWS Amplify', 'UI/UX'],
  },
  {
    title: 'CyberUhuru Web Apps',
    impact: 'Reduced load times by 30% and lifted Lighthouse scores across responsive apps',
    details: 'Shipped React + TypeScript apps consuming GraphQL APIs; ensured type-safe contracts and reusable components.',
    tags: ['React', 'TypeScript', 'GraphQL', 'Performance'],
  },
  {
    title: 'Loan Guarantee System',
    impact: 'Delivered secure loan workflows with reusable components and guarded routes',
    details: 'Implemented authentication, GraphQL integrations, and perf wins via code-splitting and memoization.',
    tags: ['React', 'GraphQL', 'Auth', 'Perf'],
  },
]

const achievements = [
  'Front-End Web Developer Bootcamp (HTML, CSS, JS, React, Angular, TS)',
  'Figma UI/UX Complete Bootcamp: 5 job-ready projects',
  'Git/GitLab/GitHub Fundamentals; CI/CD & Agile practitioner',
  'Prompt Engineering and AI Agents with ChatGPT',
  'Shopify Store Creation Course',
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">My Portfolio</h1>
            <p className="text-white/60 text-base sm:text-lg mt-2">Your public skills showcase (sample)</p>
          </div>
          <Button size="lg" className="w-full sm:w-auto">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download as PDF
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-white text-lg font-semibold">{summary.name} — {summary.headline}</p>
            <p className="text-white/70 text-sm">{summary.location}</p>
            <p className="text-white/70">{summary.blurb}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Featured Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {featuredSkills.map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm">
                {skill}
              </span>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => (
              <div key={project.title} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold">{project.title}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">Impact</span>
                </div>
                <p className="text-white/70 text-sm">{project.impact}</p>
                <p className="text-white/60 text-sm">{project.details}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {achievements.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/60"></div>
                <p className="text-white/80 text-sm">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

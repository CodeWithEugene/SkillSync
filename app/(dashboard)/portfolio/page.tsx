import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const summary = {
  name: 'Eugene Mutembei',
  headline: 'Frontend Developer & UI/UX Designer',
  location: 'Nairobi, Kenya',
  blurb: 'Results-driven FE engineer with React, Next.js, TypeScript, GraphQL, and AWS Amplify. Turns complex requirements into fast, production-ready experiences with clean architecture and API-first design.',
  contact: {
    phone: '+254 746 152 008',
    email: 'eugenegabriel.ke@gmail.com',
    linkedin: 'https://linkedin.com/in/demo-eugene',
    github: 'https://github.com/demo-eugene',
    portfolio: 'https://portfolio.demo/eugene',
  },
}

const featuredSkills = [
  'React', 'Next.js', 'TypeScript', 'GraphQL', 'Tailwind CSS',
  'AWS Amplify', 'Figma', 'Accessibility', 'CI/CD', 'Agile',
]

const projects = [
  {
    title: 'Adamur Platform UI',
    impact: 'Interactivity +35% via refined UX and faster flows',
    details: 'Built scalable Next.js + TypeScript frontends with AWS Amplify auth/deployments; delivered production-ready UI/UX.',
    tags: ['Next.js', 'TypeScript', 'AWS Amplify', 'UI/UX'],
  },
  {
    title: 'CyberUhuru Web Apps',
    impact: 'Load time -30% and Lighthouse uplift across responsive apps',
    details: 'Shipped React + TypeScript apps on GraphQL APIs; ensured type-safe contracts, reusable components, and perf tuning.',
    tags: ['React', 'TypeScript', 'GraphQL', 'Performance'],
  },
  {
    title: 'Loan Guarantee System',
    impact: 'Secure loan workflows with reusable UI and guarded routes',
    details: 'Implemented auth, GraphQL integrations, and perf wins via code-splitting, lazy loading, and memoization.',
    tags: ['React', 'GraphQL', 'Auth', 'Perf'],
  },
]

const experiences = [
  {
    role: 'UI/UX Designer, Frontend Developer',
    company: 'Adamur',
    date: 'Jul 2025 – Sep 2025',
    bullets: [
      'Created user-focused interfaces improving interactivity by 35%.',
      'Built scalable Next.js + TypeScript apps with AWS Amplify for deploy + auth.',
      'Contributed end-to-end from design to production rollout.',
    ],
  },
  {
    role: 'Frontend Developer, UI/UX Designer',
    company: 'CyberUhuru',
    date: 'Jan 2025 – Jun 2025',
    bullets: [
      'Developed responsive React + TypeScript apps integrated with GraphQL APIs.',
      'Optimized performance: -30% load time, improved Lighthouse scores.',
      'Collaborated on type-safe API contracts and reusable, accessible components.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Loan Guarantee System Project',
    date: 'Mar 2025 – Jul 2025',
    bullets: [
      'Built loan management flows with React, TypeScript, GraphQL, AWS Amplify.',
      'Implemented secure auth, reusable UI, and API integrations.',
      'Enhanced performance via code-splitting, lazy loading, memoization.',
    ],
  },
  {
    role: 'Founder & Lead Frontend Developer',
    company: 'Technetium Kenya',
    date: 'Jan 2024 – Present',
    bullets: [
      'Led delivery of high-performance, user-centric applications; +60% client satisfaction.',
      'Drove digital growth strategies improving retention by 45%.',
    ],
  },
  {
    role: 'Frontend Dev & UI/UX Design Intern',
    company: 'OneHope International',
    date: 'Mar 2023 – Sep 2023',
    bullets: [
      'Built React Native apps; +50% engagement.',
      'Delivered UX improvements increasing usability by 60%.',
    ],
  },
]

const education = {
  school: 'Jomo Kenyatta University of Agriculture and Technology (JKUAT)',
  degree: "B.Sc. Mathematics and Computer Science",
  date: 'Sep 2022 – Present',
}

const achievements = [
  'Front-End Web Developer Bootcamp: HTML, CSS, JS, React, Angular, TypeScript',
  'Figma UI/UX Complete Bootcamp (5 job-ready projects)',
  'Git/GitLab/GitHub Fundamentals; CI/CD & Agile',
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
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/70">
              <span>📞 {summary.contact.phone}</span>
              <span>✉️ {summary.contact.email}</span>
              <span>🔗 {summary.contact.linkedin}</span>
              <span>💻 {summary.contact.github}</span>
              <span>🌐 {summary.contact.portfolio}</span>
            </div>
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

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {experiences.map((exp) => (
              <div key={`${exp.company}-${exp.role}`} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-white font-semibold">{exp.role}</p>
                  <span className="text-xs text-white/60">{exp.date}</span>
                </div>
                <p className="text-white/70 text-sm">{exp.company}</p>
                <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-white font-semibold">{education.school}</p>
            <p className="text-white/80 text-sm">{education.degree}</p>
            <p className="text-white/60 text-xs">{education.date}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const careers = [
  {
    title: 'Frontend Engineer (React/Next.js)',
    match: '93% match',
    summary: 'Own performant web apps with strong DX, type safety, and clean UI systems.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'Data Product Analyst',
    match: '87% match',
    summary: 'Own experimentation, dashboards, and insights to guide roadmap decisions.',
    skills: ['SQL', 'Python', 'Experimentation', 'Storytelling'],
  },
  {
    title: 'UI/UX Engineer',
    match: '88% match',
    summary: 'Blend product thinking with interaction design to ship accessible UIs.',
    skills: ['Figma', 'Accessibility', 'Design Systems', 'React'],
  },
]

const actions = [
  'Schedule a 20-min mock interview for Frontend Engineer roles',
  'Add 2 projects showcasing GraphQL + TypeScript integrations',
  'Request endorsements for React and Product Sense',
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Career Paths for You</h1>
          <p className="text-white/60 text-base sm:text-lg mt-2">Discover careers that match your skills (sample)</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Recommended Careers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {careers.map((career) => (
              <div key={career.title} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold">{career.title}</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70">{career.match}</span>
                </div>
                <p className="text-white/70 text-sm">{career.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Suggested Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {actions.map((action) => (
              <div key={action} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-white/60"></div>
                <p className="text-white/80 text-sm">{action}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

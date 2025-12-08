"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const skills = [
  { name: 'React', level: 'Advanced', confidence: '94%', tags: ['Hooks', 'Performance'], lastValidated: '2 days ago' },
  { name: 'Next.js', level: 'Advanced', confidence: '91%', tags: ['SSR/SSG', 'Routing'], lastValidated: '3 days ago' },
  { name: 'TypeScript', level: 'Advanced', confidence: '90%', tags: ['Types', 'DX'], lastValidated: '3 days ago' },
  { name: 'GraphQL', level: 'Advanced', confidence: '88%', tags: ['Schema Design', 'Type-safe APIs'], lastValidated: '4 days ago' },
  { name: 'Tailwind CSS', level: 'Advanced', confidence: '87%', tags: ['Design Systems', 'Responsive'], lastValidated: '4 days ago' },
  { name: 'AWS Amplify', level: 'Intermediate', confidence: '82%', tags: ['Auth', 'Deployments'], lastValidated: '5 days ago' },
  { name: 'UI/UX Design', level: 'Intermediate', confidence: '85%', tags: ['Figma', 'Accessibility'], lastValidated: '5 days ago' },
]

const nextSteps = [
  { title: 'Ship design tokens', action: 'Extract reusable Tailwind presets for UI kit', eta: '2 days' },
  { title: 'GraphQL hardening', action: 'Add input validation + strict types for mutations', eta: 'This week' },
  { title: 'Perf audit', action: 'Measure and tune LCP/TTI on Next.js routes', eta: 'This week' },
]

export default function SkillsPage() {
  const [loading, setLoading] = useState(true)
  const [showEmpty, setShowEmpty] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="text-xs"
              onClick={() => setShowEmpty(!showEmpty)}
            >
              {showEmpty ? 'Show skills' : 'Show empty state'}
            </Button>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">My Skills</h1>
          <p className="text-white/60 text-base sm:text-lg mt-2">View and manage your extracted skills</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Extracted Skills</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse h-32"></div>
              ))
            ) : showEmpty ? (
              <div className="col-span-2 text-center text-white/60 py-8">No skills yet.</div>
            ) : (
              skills.map((skill) => (
                <div key={skill.name} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">{skill.name}</p>
                      <p className="text-white/60 text-sm">Last validated {skill.lastValidated}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80">
                      {skill.level} • {skill.confidence}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="h-16 rounded-lg bg-white/5 border border-white/10 animate-pulse"></div>
                ))}
              </div>
            ) : showEmpty ? (
              <div className="text-white/60 text-sm">No next steps yet.</div>
            ) : (
              nextSteps.map((step) => (
                <div key={step.title} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white font-medium">{step.title}</p>
                    <p className="text-white/60 text-sm">{step.action}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">ETA: {step.eta}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

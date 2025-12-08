import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/supabase-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const sampleStats = [
  { label: 'Projects Shipped', value: '5', helper: 'React/Next.js launches' },
  { label: 'Designs Delivered', value: '12', helper: 'Prod-ready Figma files' },
  { label: 'Integrations', value: '9', helper: 'GraphQL & REST' },
]

const recentActivity = [
  { title: 'Adamur UI System', detail: 'Refined design tokens • 97% confidence', time: '2h ago' },
  { title: 'CyberUhuru Dashboard', detail: 'Lighthouse +30 performance', time: 'yesterday' },
  { title: 'Loan Guarantee App', detail: 'GraphQL integrations validated', time: '2 days ago' },
]

const learningFocus = [
  { title: 'Machine Learning Foundations', status: 'In progress', progress: 68 },
  { title: 'Systems Design Fundamentals', status: 'Planned', progress: 20 },
  { title: 'Product Thinking for Engineers', status: 'Review', progress: 45 },
]

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const careerPath = user?.user_metadata?.careerPath || 'Frontend Engineer'

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/60">Last updated: just now</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Welcome back, {user.name || user.email}!</h1>
          <p className="text-white/70 text-base sm:text-lg">Career path: <span className="text-white font-semibold">{careerPath}</span></p>
          <p className="text-white/60 text-sm sm:text-base">Here’s your SkillSync overview</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/documents">
              <Button size="sm" className="text-sm">Upload document</Button>
            </Link>
            <Link href="/careers">
              <Button size="sm" variant="secondary" className="text-sm">Explore careers</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleStats.map((stat) => (
            <Card key={stat.label} className="hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="text-base text-white/70 font-medium">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-5xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.helper}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Link href="/documents" className="block">
              <Button className="w-full h-24 sm:h-28 text-sm sm:text-base">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-center">Upload New Coursework</span>
                </div>
              </Button>
            </Link>
            <Link href="/skills" className="block">
              <Button className="w-full h-24 sm:h-28 text-sm sm:text-base" variant="secondary">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-center">View My Skills</span>
                </div>
              </Button>
            </Link>
            <Link href="/careers" className="block sm:col-span-2 lg:col-span-1">
              <Button className="w-full h-24 sm:h-28 text-sm sm:text-base" variant="secondary">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-center">Explore Careers</span>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.title} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-white/60 text-sm">{item.detail}</p>
                  </div>
                  <span className="text-white/50 text-sm">{item.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Learning Focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningFocus.map((item) => (
                <div key={item.title} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{item.title}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">{item.status}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-white/70" style={{ width: `${item.progress}%` }}></div>
                  </div>
                  <p className="text-white/60 text-xs">{item.progress}% complete</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

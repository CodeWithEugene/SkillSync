import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/supabase-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Welcome back, {user.name || user.email}!</h1>
          <p className="text-white/60 text-base sm:text-lg">Here's your SkillSync overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="text-base text-white/70 font-medium">Documents Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-white">0</p>
            </CardContent>
          </Card>
          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="text-base text-white/70 font-medium">Skills Identified</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-white">0</p>
            </CardContent>
          </Card>
          <Card className="hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="text-base text-white/70 font-medium">Career Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-white">0</p>
            </CardContent>
          </Card>
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

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/60 text-center py-6 sm:py-8 text-sm sm:text-base">No recent activity yet. Start by uploading your first document!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

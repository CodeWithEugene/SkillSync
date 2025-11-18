import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/supabase-auth"
import { LogoutButton } from "@/components/auth/logout-button"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-2xl font-bold text-white tracking-tight hover:scale-105 transition-transform">
              SkillSync
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all">
                Dashboard
              </Link>
              <Link href="/documents" className="text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all">
                Documents
              </Link>
              <Link href="/skills" className="text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all">
                Skills
              </Link>
              <Link href="/careers" className="text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all">
                Careers
              </Link>
              <Link href="/portfolio" className="text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all">
                Portfolio
              </Link>
              <Link href="/profile" className="text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all">
                Profile
              </Link>
              <div className="ml-4">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}

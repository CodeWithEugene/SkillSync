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
    <div className="min-h-screen">
      <nav className="border-b border-slate-700 bg-slate-900">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-2xl font-bold">
              SkillSync
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </Link>
              <Link href="/documents" className="hover:text-blue-400 transition">
                Documents
              </Link>
              <Link href="/skills" className="hover:text-blue-400 transition">
                Skills
              </Link>
              <Link href="/careers" className="hover:text-blue-400 transition">
                Careers
              </Link>
              <Link href="/portfolio" className="hover:text-blue-400 transition">
                Portfolio
              </Link>
              <Link href="/profile" className="hover:text-blue-400 transition">
                Profile
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}

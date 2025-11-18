import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
          SkillSync
        </h1>
        <p className="text-xl text-slate-300">
          Transform your academic coursework into industry-recognized skills
        </p>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Upload your syllabi, assignments, and notes. Our AI analyzes them to extract 
          and verify your skills, then matches you with the perfect career paths.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/auth/register">
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="text-lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

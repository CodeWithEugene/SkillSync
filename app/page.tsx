import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-white tracking-tight hover:scale-105 transition-transform">
              SkillSync
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-sm sm:text-base">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="text-sm sm:text-base">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Gradient orbs for visual interest */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8">
      
      <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
        <div className="space-y-6">
          <h1 className="text-7xl md:text-8xl font-bold text-white tracking-tight">
            SkillSync
          </h1>
          <div className="h-1 w-24 bg-white mx-auto rounded-full"></div>
        </div>
        
        <p className="text-2xl md:text-3xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
          Transform your academic coursework into industry-recognized skills
        </p>
        
        <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          Upload your syllabi, assignments, and notes. Our AI analyzes them to extract 
          and verify your skills, then matches you with the perfect career paths.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/auth/register">
            <Button size="lg" className="text-base px-12">
              Get Started
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="text-base px-12">
              Sign In
            </Button>
          </Link>
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
          <div className="glass glass-hover rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg">Upload Documents</h3>
            <p className="text-white/60 text-sm">Easily upload your coursework and academic materials</p>
          </div>
          
          <div className="glass glass-hover rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg">AI Analysis</h3>
            <p className="text-white/60 text-sm">Advanced AI extracts and verifies your skills</p>
          </div>
          
          <div className="glass glass-hover rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg">Career Matching</h3>
            <p className="text-white/60 text-sm">Get matched with perfect career opportunities</p>
          </div>
        </div>
      </div>
      </div>
    </main>
  )
}

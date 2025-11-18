"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Registration successful! Please sign in.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    console.log("Attempting login with:", email)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("Login response:", { data, authError })

      if (authError) {
        console.error("Auth error details:", {
          message: authError.message,
          status: authError.status,
          name: authError.name,
          cause: authError.cause,
          full: authError
        })
        
        // Show the exact error message for debugging
        setError(`Authentication Error: ${authError.message}`)
        setLoading(false)
        return
      }

      if (data.user) {
        console.log("Login successful, user:", data.user)
        
        // Check if email needs confirmation
        if (!data.user.email_confirmed_at && !data.session) {
          setError("Please confirm your email address before signing in. Check your inbox for a confirmation email.")
          setLoading(false)
          return
        }

        // Wait a moment for cookies to be set, then check session
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        console.log("Session after login:", { sessionData, sessionError })
        
        if (sessionData?.session) {
          setSuccess("Login successful! Redirecting...")
          // Use window.location for full page reload to ensure cookies are read
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 500)
        } else {
          console.error("No session after login")
          setError("Session not established. Please try again.")
          setLoading(false)
        }
      } else {
        setError("Login failed. Please try again.")
        setLoading(false)
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error?.message || "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <Card className="w-full max-w-md relative z-10">
        <CardHeader className="space-y-3 text-center pb-8">
          <CardTitle className="text-4xl font-bold text-white tracking-tight">SkillSync</CardTitle>
          <CardDescription className="text-white/70 text-base">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 backdrop-blur-xl border border-red-500/20">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            {success && (
              <div className="p-4 rounded-xl bg-green-500/10 backdrop-blur-xl border border-green-500/20">
                <p className="text-sm text-green-400">{success}</p>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>



          <p className="text-center text-sm text-white/70 pt-4">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-white hover:underline font-semibold transition-all">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

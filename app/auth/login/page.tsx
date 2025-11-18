"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-4 text-white/50 font-medium">Or continue with</span>
            </div>
          </div>

          <Button
            variant="secondary"
            disabled={loading}
            className="w-full"
            onClick={async () => {
              setError("")
              setLoading(true)
              try {
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: `${window.location.origin}/dashboard`,
                  },
                })
                if (error) {
                  setError(error.message || "Failed to sign in with Google")
                }
              } catch (err: any) {
                setError(err?.message || "Failed to sign in with Google")
              } finally {
                setLoading(false)
              }
            }}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </Button>

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

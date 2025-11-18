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
        console.error("Auth error:", authError)
        // Check for specific error types
        if (authError.message.includes("Email not confirmed")) {
          setError("Please confirm your email address before signing in. Check your inbox for a confirmation email.")
        } else if (authError.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please check your credentials and try again.")
        } else {
          setError(authError.message || "Invalid email or password. Please try again.")
        }
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">SkillSync</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}
            {success && (
              <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-green-500">{success}</p>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              disabled={loading}
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
              Google
            </Button>
            <Button
              variant="outline"
              disabled={loading}
              onClick={async () => {
                setError("")
                setLoading(true)
                try {
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'github',
                    options: {
                      redirectTo: `${window.location.origin}/dashboard`,
                    },
                  })
                  if (error) {
                    setError(error.message || "Failed to sign in with GitHub")
                  }
                } catch (err: any) {
                  setError(err?.message || "Failed to sign in with GitHub")
                } finally {
                  setLoading(false)
                }
              }}
            >
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popup } from "@/components/ui/popup"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    careerPath: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            careerPath: formData.careerPath,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (authError) {
        setError(`Registration Error: ${authError.message}`)
        setLoading(false)
        return
      }

      if (data.user) {
        if (data.session) {
          router.push("/dashboard")
          router.refresh()
        } else {
          setError("")
          setShowSuccessPopup(true)
        }
      }
    } catch (error: any) {
      setError(error?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <Card className="w-full max-w-md relative z-10">
        <CardHeader className="space-y-3 text-center pb-8">
          <CardTitle className="text-4xl font-bold text-white tracking-tight">SkillSync</CardTitle>
          <CardDescription className="text-white/70 text-base">Create your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              placeholder="Desired career path (e.g., Frontend Engineer)"
              value={formData.careerPath}
              onChange={(e) => setFormData({ ...formData, careerPath: e.target.value })}
              required
            />
            <PasswordInput
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <PasswordInput
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 backdrop-blur-xl border border-red-500/20">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-center text-sm text-white/70 pt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-white hover:underline font-semibold transition-all">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>

      <Popup
        isOpen={showSuccessPopup}
        onClose={() => {
          setShowSuccessPopup(false)
          router.push("/auth/login")
        }}
        title="Confirm Your Email"
        message="Please check your email to confirm your account, then sign in."
        buttonText="Continue to Sign In"
      />
    </div>
  )
}

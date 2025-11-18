"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error("Auth callback error:", error)
          router.push("/auth/login?error=auth_failed")
          return
        }

        if (data.session) {
          console.log("Auth successful, redirecting to dashboard")
          router.push("/dashboard")
        } else {
          console.log("No session found, redirecting to login")
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("Callback handling error:", error)
        router.push("/auth/login?error=callback_failed")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-white/70">Completing sign in...</p>
      </div>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState("Processing...")

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setStatus("Checking authentication...")
        console.log("Auth callback started")
        console.log("URL params:", Object.fromEntries(searchParams.entries()))

        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession()
        console.log("Session data:", data)
        console.log("Session error:", error)
        
        if (error) {
          console.error("Auth callback error:", error)
          setStatus(`Error: ${error.message}`)
          setTimeout(() => router.push("/auth/login?error=auth_failed"), 2000)
          return
        }

        if (data.session && data.session.user) {
          console.log("Auth successful, user:", data.session.user.email)
          setStatus("Success! Redirecting to dashboard...")
          
          // Force redirect with window.location for better reliability
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 1000)
        } else {
          console.log("No session found")
          setStatus("No session found, redirecting to login...")
          setTimeout(() => router.push("/auth/login"), 2000)
        }
      } catch (error) {
        console.error("Callback handling error:", error)
        setStatus(`Callback error: ${error}`)
        setTimeout(() => router.push("/auth/login?error=callback_failed"), 2000)
      }
    }

    // Small delay to ensure URL params are loaded
    const timer = setTimeout(handleAuthCallback, 500)
    return () => clearTimeout(timer)
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-white text-lg">Completing sign in...</p>
        <p className="text-white/60 text-sm">{status}</p>
      </div>
    </div>
  )
}
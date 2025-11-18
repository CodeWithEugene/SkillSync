"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "./supabase"

export function useAuthListener() {
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email)
        
        if (event === 'SIGNED_IN' && session) {
          router.push("/dashboard")
          router.refresh()
        } else if (event === 'SIGNED_OUT') {
          router.push("/auth/login")
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])
}
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export function EnvCheck() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const [connectionTest, setConnectionTest] = useState<string>("Testing...")

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          setConnectionTest(`❌ Error: ${error.message}`)
        } else {
          setConnectionTest("✅ Connection OK")
        }
      } catch (err: any) {
        setConnectionTest(`❌ Failed: ${err.message}`)
      }
    }
    testConnection()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 text-xs text-white max-w-sm">
      <h3 className="font-bold mb-2">Environment Check</h3>
      <div className="space-y-1">
        <div>
          <strong>Supabase URL:</strong> {supabaseUrl ? '✅ Set' : '❌ Missing'}
        </div>
        <div>
          <strong>Supabase Key:</strong> {supabaseKey ? '✅ Set' : '❌ Missing'}
        </div>
        <div>
          <strong>Connection:</strong> {connectionTest}
        </div>
        {supabaseUrl && (
          <div className="text-xs opacity-70 mt-2">
            URL: {supabaseUrl}
          </div>
        )}
      </div>
    </div>
  )
}
"use client"

export function EnvCheck() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

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
        {supabaseUrl && (
          <div className="text-xs opacity-70 mt-2">
            URL: {supabaseUrl}
          </div>
        )}
      </div>
    </div>
  )
}
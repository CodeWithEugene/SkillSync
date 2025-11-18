import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <h1 className="text-5xl font-bold text-white tracking-tight">Career Paths for You</h1>
          <p className="text-white/60 text-lg mt-2">Discover careers that match your skills</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-2xl">Recommended Careers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white/60">Career recommendations will appear once you have verified skills.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

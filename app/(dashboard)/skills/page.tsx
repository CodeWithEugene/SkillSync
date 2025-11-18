import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <h1 className="text-5xl font-bold text-white tracking-tight">My Skills</h1>
          <p className="text-white/60 text-lg mt-2">View and manage your extracted skills</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-2xl">Extracted Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white/60">No skills extracted yet. Upload documents to discover your skills!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

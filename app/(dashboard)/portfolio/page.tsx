import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white tracking-tight">My Portfolio</h1>
            <p className="text-white/60 text-lg mt-2">Your public skills showcase</p>
          </div>
          <Button size="lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download as PDF
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-2xl">Public Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-white/60">Your portfolio will showcase your verified skills and career readiness.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

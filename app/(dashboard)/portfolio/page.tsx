import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">My Portfolio</h1>
          <Button>Download as PDF</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Public Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">Your portfolio will showcase your verified skills and career readiness.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

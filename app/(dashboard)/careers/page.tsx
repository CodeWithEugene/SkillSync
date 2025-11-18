import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CareersPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Career Paths for You</h1>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Careers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">Career recommendations will appear once you have verified skills.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

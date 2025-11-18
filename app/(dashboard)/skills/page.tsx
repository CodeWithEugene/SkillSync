import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SkillsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">My Skills</h1>

        <Card>
          <CardHeader>
            <CardTitle>Extracted Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">No skills extracted yet. Upload documents to discover your skills!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

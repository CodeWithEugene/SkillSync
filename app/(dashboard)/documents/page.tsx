import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DocumentsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">My Coursework</h1>
          <Button>Upload Document</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">No documents uploaded yet. Upload your first coursework to get started!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

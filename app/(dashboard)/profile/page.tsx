import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h1 className="text-5xl font-bold text-white tracking-tight">Profile Settings</h1>
          <p className="text-white/60 text-lg mt-2">Manage your account information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-2xl">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">Name</label>
              <Input placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">Bio</label>
              <Input placeholder="Tell us about yourself" />
            </div>
            <Button size="lg" className="mt-4">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

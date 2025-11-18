import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Profile Settings</h1>
          <p className="text-white/60 text-base sm:text-lg mt-2">Manage your account information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 sm:space-y-6">
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
            <Button size="lg" className="mt-4 w-full sm:w-auto">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

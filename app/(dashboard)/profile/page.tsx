import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const sampleProfile = {
  name: 'Eugene Mutembei',
  email: 'eugenegabriel.ke@gmail.com',
  bio: 'Frontend Developer & UI/UX Designer shipping production-ready React/Next apps.',
  role: 'Frontend Developer · UI/UX Designer',
  location: 'Nairobi, Kenya',
  careerPath: 'Frontend Engineer',
  links: {
    linkedin: 'https://linkedin.com/in/demo-eugene',
    github: 'https://github.com/demo-eugene',
    portfolio: 'https://portfolio.demo/eugene',
  },
}

const completionItems = [
  { label: 'Verify email', status: 'Completed' },
  { label: 'Add headline & bio', status: 'Completed' },
  { label: 'Link LinkedIn profile', status: 'Pending' },
  { label: 'Upload resume', status: 'Pending' },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">Profile Settings</h1>
          <p className="text-white/60 text-base sm:text-lg mt-2">Manage your account information</p>
          <p className="text-white/70 text-sm">Career path: <span className="text-white font-semibold">{sampleProfile.careerPath}</span></p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">Name</label>
              <Input placeholder="Your name" defaultValue={sampleProfile.name} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">Email</label>
              <Input type="email" placeholder="your@email.com" defaultValue={sampleProfile.email} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">Headline</label>
              <Input placeholder="Role or focus" defaultValue={sampleProfile.role} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">Desired career path</label>
              <Input placeholder="e.g., Frontend Engineer" defaultValue={sampleProfile.careerPath} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">Location</label>
              <Input placeholder="City, Country" defaultValue={sampleProfile.location} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">Bio</label>
              <Input placeholder="Tell us about yourself" defaultValue={sampleProfile.bio} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">Links</label>
              <Input placeholder="LinkedIn" defaultValue={sampleProfile.links.linkedin} />
              <Input placeholder="GitHub" defaultValue={sampleProfile.links.github} />
              <Input placeholder="Portfolio" defaultValue={sampleProfile.links.portfolio} />
            </div>
            <Button size="lg" className="mt-4 w-full sm:w-auto">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white text-xl sm:text-2xl">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completionItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white/80 text-sm">{item.label}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">{item.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

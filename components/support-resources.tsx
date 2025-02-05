import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Mail, Video, BookOpen, Users, Heart } from "lucide-react"

const professionals = [
  {
    name: "Dr. Sarah Johnson",
    title: "OCD Specialist",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Mon-Fri, 9am-5pm",
    contact: {
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
    },
  },
  {
    name: "Dr. Michael Chen",
    title: "Clinical Psychologist",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Tue-Sat, 10am-6pm",
    contact: {
      email: "michael.chen@example.com",
      phone: "+1 (555) 234-5678",
    },
  },
]

const resources = [
  {
    title: "Self-Help Books",
    icon: BookOpen,
    items: [
      "The OCD Workbook by Bruce Hyman",
      "Brain Lock by Jeffrey Schwartz",
      "Freedom from OCD by Jonathan Grayson",
    ],
  },
  {
    title: "Support Groups",
    icon: Users,
    items: ["OCD Support Group - Every Tuesday 7pm", "Family Support Group - Monthly", "Online Community Forum"],
  },
  {
    title: "Wellness Activities",
    icon: Heart,
    items: ["Mindfulness Meditation Sessions", "Stress Management Workshops", "Exercise Programs"],
  },
]

export function SupportResources() {
  return (
    <Tabs defaultValue="professionals" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="professionals">Professional Help</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>

      <TabsContent value="professionals" className="space-y-6">
        {professionals.map((professional) => (
          <Card key={professional.name}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={professional.image || "/placeholder.svg"}
                  alt={professional.name}
                  className="rounded-full w-24 h-24 object-cover"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{professional.name}</h3>
                    <p className="text-muted-foreground">{professional.title}</p>
                    <p className="text-sm text-muted-foreground">Available: {professional.availability}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={`mailto:${professional.contact.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={`tel:${professional.contact.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Video Call
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="resources" className="space-y-6">
        {resources.map((resource) => (
          <Card key={resource.title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <resource.icon className="w-5 h-5" />
                <CardTitle>{resource.title}</CardTitle>
              </div>
              <CardDescription>Available resources and support options</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {resource.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  )
}


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
  const selfHelpBooks = [
    {
      title: "Brain Lock",
      author: "Jeffrey M. Schwartz",
      link: "https://www.amazon.com/Brain-Lock-Yourself-Obsessive-Compulsive-Behavior/dp/0060987111"
    },
    {
      title: "The Mindfulness Workbook for OCD",
      author: "Jon Hershfield MFT",
      link: "https://www.amazon.com/Mindfulness-Workbook-OCD-Overcoming-Compulsions/dp/1684035635"
    },
    // Add more books with links
  ]

  const supportGroups = [
    {
      name: "International OCD Foundation",
      description: "Find local support groups",
      link: "https://iocdf.org/support-groups/"
    },
    {
      name: "OCD Action Support Groups",
      description: "Online and in-person support groups",
      link: "https://www.ocdaction.org.uk/support-groups"
    },
    // Add more support groups with links
  ]

  const wellnessActivities = [
    {
      name: "Headspace Meditation",
      description: "Guided meditation app",
      link: "https://www.headspace.com/"
    },
    {
      name: "Yoga for Mental Health",
      description: "Free yoga resources",
      link: "https://www.yogajournal.com/practice/yoga-for-anxiety/"
    },
    // Add more activities with links
  ]

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
        <Card>
          <CardHeader>
            <CardTitle>Self-Help Books</CardTitle>
            <CardDescription>Recommended reading for OCD management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selfHelpBooks.map((book) => (
                <a 
                  key={book.title} 
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg hover:bg-secondary/10 transition-colors"
                >
                  <div className="font-medium">{book.title}</div>
                  <div className="text-sm text-muted-foreground">by {book.author}</div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Groups</CardTitle>
            <CardDescription>Connect with others in the OCD community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportGroups.map((group) => (
                <a
                  key={group.name}
                  href={group.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg hover:bg-secondary/10 transition-colors"
                >
                  <div className="font-medium">{group.name}</div>
                  <div className="text-sm text-muted-foreground">{group.description}</div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wellness Activities</CardTitle>
            <CardDescription>Complementary practices for mental health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wellnessActivities.map((activity) => (
                <a
                  key={activity.name}
                  href={activity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg hover:bg-secondary/10 transition-colors"
                >
                  <div className="font-medium">{activity.name}</div>
                  <div className="text-sm text-muted-foreground">{activity.description}</div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}


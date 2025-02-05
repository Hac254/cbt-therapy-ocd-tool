import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Phone, MessageSquare, Heart, AlertTriangle, ExternalLink } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const emergencyContacts = [
  {
    name: "Crisis Helpline",
    description: "24/7 Emergency Support",
    phone: "1-800-273-8255",
    available: "24/7",
  },
  {
    name: "OCD Support Team",
    description: "Specialized OCD Crisis Support",
    phone: "1-855-OCD-HELP",
    available: "24/7",
  },
]

const copingStrategies = [
  {
    title: "Grounding Technique",
    steps: [
      "Find 5 things you can see",
      "Notice 4 things you can touch",
      "Identify 3 things you can hear",
      "Focus on 2 things you can smell",
      "Be aware of 1 thing you can taste",
    ],
  },
  {
    title: "Deep Breathing",
    steps: ["Breathe in for 4 counts", "Hold for 4 counts", "Exhale for 4 counts", "Repeat 4 times"],
  },
]

export function EmergencySupport() {
  return (
    <div className="space-y-6">
      <Alert variant="destructive" className="sm:mx-auto sm:max-w-2xl">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>If you're having thoughts of self-harm</AlertTitle>
        <AlertDescription className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span>Please call emergency services (911) immediately or go to the nearest emergency room.</span>
          <Button variant="destructive" size="sm" asChild className="whitespace-nowrap">
            <a href="tel:911">
              <Phone className="w-4 h-4 mr-2" />
              Call 911
            </a>
          </Button>
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
            <CardDescription>Professional help is available 24/7</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {emergencyContacts.map((contact) => (
                <Card key={contact.name} className="border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.description}</p>
                        <p className="text-sm text-muted-foreground">Available: {contact.available}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button asChild variant="default" size="sm">
                          <a href={`tel:${contact.phone}`}>
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now
                          </a>
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Text
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <CardTitle>Coping Strategies</CardTitle>
            </div>
            <CardDescription>Immediate techniques to help manage anxiety</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-6">
                {copingStrategies.map((strategy) => (
                  <div key={strategy.title} className="space-y-2">
                    <h4 className="font-medium">{strategy.title}</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      {strategy.steps.map((step, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              <CardTitle>Additional Resources</CardTitle>
            </div>
            <CardDescription>Helpful links and information</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Online Resources</h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://iocdf.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        International OCD Foundation
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        NIMH OCD Information
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Support Groups</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground">Local OCD Support Group - Every Tuesday 7pm</li>
                    <li className="text-sm text-muted-foreground">Online Support Community - 24/7</li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


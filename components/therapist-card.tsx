import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"

interface TherapistCardProps {
  onClose: () => void
}

export function TherapistCard({ onClose }: TherapistCardProps) {
  return (
    <Card className="bg-secondary border-primary/20">
      <CardHeader>
        <CardTitle className="text-primary">Emergency Support Available</CardTitle>
        <CardDescription>Contact our on-call OCD specialist</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2">
            <img
              src="https://i.ibb.co/qFWWVbP/avatar-1.png?height=64&width=64"
              alt="Therapist"
              className="rounded-full w-16 h-16 border-2 border-primary"
            />
            <div>
              <h3 className="font-semibold text-primary">Dr. Josh Read</h3>
              <p className="text-sm text-muted-foreground">Licensed OCD Specialist</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Phone className="h-4 w-4" />
              <a href="tel:+44 5654 234123" className="text-sm hover:underline">
                (+44) 7644 432042
              </a>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Mail className="h-4 w-4" />
              <a href="mailto:fikiadigital@gmail.com" className="text-sm hover:underline">
              cbttherapy@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">123 Therapy St, Suite 100</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Available 24/7 for emergency consultations. Response time: within 1 hour.
            </p>
          </div>

          <div className="flex gap-2">
            <Button className="w-full" onClick={() => (window.location.href = "tel:+1234567890")}>
              Call Now
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


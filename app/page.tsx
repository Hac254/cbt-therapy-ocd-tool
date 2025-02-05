import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Brain,
  Scale,
  MessageSquareIcon as MessageSquareQuestion,
  BarChart,
  BookOpen,
  AlertCircle,
  ArrowRight,
} from "lucide-react"

const features = [
  {
    title: "Doubt Tracker",
    description: "Record and analyze your obsessional sequences",
    icon: Brain,
    href: "/doubt-tracker",
    color: "bg-primary/10",
    stats: "Track your triggers and responses",
  },
  {
    title: "Reality Check",
    description: "Compare imagination vs. reality",
    icon: Scale,
    href: "/reality-check",
    color: "bg-secondary/10",
    stats: "Ground yourself in the present",
  },
  {
    title: "Socratic Questions",
    description: "Challenge your thoughts through guided dialogue",
    icon: MessageSquareQuestion,
    href: "/socratic",
    color: "bg-accent/10",
    stats: "Explore your thinking patterns",
  },
  {
    title: "Progress Tracker",
    description: "Visualize your improvement over time",
    icon: BarChart,
    href: "/progress",
    color: "bg-primary/10",
    stats: "See your journey",
  },
  {
    title: "Learn About I-CBT",
    description: "Educational resources and exercises",
    icon: BookOpen,
    href: "/learn",
    color: "bg-secondary/10",
    stats: "Understand your OCD",
  },
  {
    title: "Emergency Support",
    description: "Access immediate help and resources",
    icon: AlertCircle,
    href: "/emergency",
    color: "bg-destructive/10",
    stats: "24/7 support available",
  },
]

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Welcome to OCD Helper 🌟</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-[600px]">
          Your companion for managing OCD using Inference-Based CBT techniques.
        </p>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tools and resources you might need</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/doubt-tracker/new">Record Doubt Sequence</Link>
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href="/reality-check">Reality Check</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/emergency">Emergency Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Features Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.href} className="relative group hover:shadow-lg transition-shadow">
            <CardHeader className={feature.color}>
              <div className="flex items-center gap-2">
                <feature.icon className="h-5 w-5" />
                <CardTitle className="text-base sm:text-lg">{feature.title}</CardTitle>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">{feature.stats}</div>
              <Button asChild className="w-full group-hover:bg-primary/90">
                <Link href={feature.href} className="flex items-center justify-center gap-2">
                  Open
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


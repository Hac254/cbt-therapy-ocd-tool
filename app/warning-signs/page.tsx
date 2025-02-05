"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, ArrowRight } from "lucide-react"
import { TherapistCard } from "@/components/therapist-card"

const warningSignCategories = [
  {
    title: "Behavioral Changes",
    signs: [
      "Increased time spent on compulsions",
      "Avoiding more situations or places",
      "Sleep pattern changes",
      "Difficulty completing daily tasks",
      "Increased reassurance seeking",
    ],
  },
  {
    title: "Emotional Changes",
    signs: [
      "Heightened anxiety levels",
      "Increased irritability",
      "Feeling overwhelmed more often",
      "Mood swings",
      "Feeling hopeless about recovery",
    ],
  },
  {
    title: "Thought Patterns",
    signs: [
      "More frequent intrusive thoughts",
      "Difficulty dismissing thoughts",
      "Increased worry about safety",
      "Black and white thinking",
      "Catastrophizing situations",
    ],
  },
]

export default function WarningSignsPage() {
  const [checkedSigns, setCheckedSigns] = useState<string[]>([])
  const [showTherapist, setShowTherapist] = useState(false)

  const totalSigns = warningSignCategories.reduce((acc, category) => acc + category.signs.length, 0)
  const progress = (checkedSigns.length / totalSigns) * 100

  const handleToggle = (sign: string) => {
    setCheckedSigns((prev) => (prev.includes(sign) ? prev.filter((s) => s !== sign) : [...prev, sign]))
  }

  const getRiskLevel = () => {
    const percentage = (checkedSigns.length / totalSigns) * 100
    if (percentage >= 70) return { level: "High", color: "text-red-500" }
    if (percentage >= 40) return { level: "Moderate", color: "text-yellow-500" }
    return { level: "Low", color: "text-green-500" }
  }

  const risk = getRiskLevel()

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-primary">Warning Signs Checker 🚨</h1>
          <p className="text-lg text-muted-foreground">
            Monitor potential warning signs to stay proactive in your recovery journey
          </p>
        </div>

        {showTherapist ? (
          <div className="mb-8">
            <TherapistCard onClose={() => setShowTherapist(false)} />
          </div>
        ) : (
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <CardTitle>Current Status</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
                  <div className={`text-xl font-bold ${risk.color}`}>{risk.level}</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-sm text-muted-foreground mb-1">Signs Detected</div>
                  <div className="text-xl font-bold">
                    {checkedSigns.length} of {totalSigns}
                  </div>
                </div>
                <Button
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                  onClick={() => setShowTherapist(true)}
                >
                  <span>Get Support</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <Progress value={progress} className="h-2 bg-secondary" />
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {warningSignCategories.map((category, index) => (
            <Card key={index} className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">{category.title}</CardTitle>
                <CardDescription>Check any signs you've noticed recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.signs.map((sign, signIndex) => (
                    <div key={signIndex} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${index}-${signIndex}`}
                        checked={checkedSigns.includes(sign)}
                        onCheckedChange={() => handleToggle(sign)}
                        className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <label
                        htmlFor={`${index}-${signIndex}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {sign}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


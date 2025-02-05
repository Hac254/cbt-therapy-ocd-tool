"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus } from "lucide-react"

interface Goal {
  id: string
  description: string
  timeframe: "short" | "medium" | "long"
  currentRating: number
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [description, setDescription] = useState("")
  const [timeframe, setTimeframe] = useState<"short" | "medium" | "long">("short")

  const addGoal = () => {
    if (!description) return

    const newGoal = {
      id: Math.random().toString(),
      description,
      timeframe,
      currentRating: 0,
    }

    setGoals([...goals, newGoal])
    setDescription("")
  }

  const updateRating = (goalId: string, rating: number) => {
    setGoals(goals.map((goal) => (goal.id === goalId ? { ...goal, currentRating: rating } : goal)))
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Set Your Goals</CardTitle>
          <CardDescription>Set specific, realistic, and positive goals for managing your OCD</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Goal Description</Label>
              <Input
                placeholder="Enter your goal..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Timeframe</Label>
              <RadioGroup value={timeframe} onValueChange={(value: "short" | "medium" | "long") => setTimeframe(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short" />
                  <Label htmlFor="short">Short-term</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium-term</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long" />
                  <Label htmlFor="long">Long-term</Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={addGoal} className="w-full" disabled={!description}>
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>

          <div className="space-y-4">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium">{goal.description}</div>
                      <div className="text-sm text-muted-foreground capitalize">{goal.timeframe}-term goal</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Current Progress (0-5)</Label>
                      <div className="flex space-x-2">
                        {[0, 1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            variant={goal.currentRating === rating ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateRating(goal.id, rating)}
                          >
                            {rating}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


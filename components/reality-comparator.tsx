"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Plus, X } from "lucide-react"
import type { RealityCheck } from "@/types/doubt-sequence"

export function RealityComparator() {
  const [checks, setChecks] = useState<RealityCheck[]>([])
  const [obsessionalThought, setObsessionalThought] = useState("")
  const [currentEvidence, setCurrentEvidence] = useState("")
  const [sensoryEvidence, setSensoryEvidence] = useState<string[]>([])
  const [realityRating, setRealityRating] = useState(50)

  const addEvidence = () => {
    if (!currentEvidence) return
    setSensoryEvidence([...sensoryEvidence, currentEvidence])
    setCurrentEvidence("")
  }

  const removeEvidence = (index: number) => {
    setSensoryEvidence(sensoryEvidence.filter((_, i) => i !== index))
  }

  const addCheck = () => {
    if (!obsessionalThought || sensoryEvidence.length === 0) return

    const newCheck: RealityCheck = {
      id: Math.random().toString(),
      date: new Date().toISOString(),
      obsessionalThought,
      sensoryEvidence,
      realityRating,
    }

    setChecks([newCheck, ...checks])
    resetForm()
  }

  const resetForm = () => {
    setObsessionalThought("")
    setSensoryEvidence([])
    setRealityRating(50)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:sticky md:top-24 h-fit">
        <CardHeader>
          <CardTitle>Reality vs. Imagination</CardTitle>
          <CardDescription>Compare your obsessional thoughts with sensory evidence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Obsessional Thought</Label>
            <Textarea
              placeholder="What's the doubt or fear?"
              value={obsessionalThought}
              onChange={(e) => setObsessionalThought(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Sensory Evidence</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="What do you actually see/hear/feel?"
                value={currentEvidence}
                onChange={(e) => setCurrentEvidence(e.target.value)}
              />
              <Button onClick={addEvidence} disabled={!currentEvidence}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {sensoryEvidence.map((evidence, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <span className="text-sm">{evidence}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeEvidence(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reality Rating</Label>
            <div className="space-y-2">
              <Slider
                value={[realityRating]}
                onValueChange={(value) => setRealityRating(value[0])}
                min={0}
                max={100}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Imagination</span>
                <span>{realityRating}%</span>
                <span>Reality</span>
              </div>
            </div>
          </div>

          <Button onClick={addCheck} className="w-full" disabled={!obsessionalThought || sensoryEvidence.length === 0}>
            Save Reality Check
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {checks.map((check) => (
          <Card key={check.id}>
            <CardHeader>
              <CardTitle className="text-base">{new Date(check.date).toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 p-4 bg-destructive/10 rounded-lg">
                  <Label className="text-destructive">Obsessional Thought</Label>
                  <p className="text-sm">{check.obsessionalThought}</p>
                </div>
                <div className="space-y-2 p-4 bg-primary/10 rounded-lg">
                  <Label className="text-primary">Sensory Evidence</Label>
                  <ul className="text-sm space-y-1">
                    {check.sensoryEvidence.map((evidence, index) => (
                      <li key={index}>{evidence}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Reality Rating</Label>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${check.realityRating}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


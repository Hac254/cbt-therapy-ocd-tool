"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import type { DoubtSequence } from "@/types/doubt-sequence"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"

export function DoubtSequenceTracker() {
  const [sequences, setSequences] = useState<DoubtSequence[]>([])
  const [trigger, setTrigger] = useState<{ description: string; type: "external" | "internal" }>({ description: "", type: "external" })
  const [doubt, setDoubt] = useState("")
  const [consequences, setConsequences] = useState("")
  const [anxietyLevel, setAnxietyLevel] = useState(5)
  const [compulsiveBehavior, setCompulsiveBehavior] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addSequence = () => {
    if (!trigger.description || !doubt || !consequences || !compulsiveBehavior) return

    const newSequence: DoubtSequence = {
      id: Math.random().toString(),
      date: new Date().toISOString(),
      trigger,
      doubt,
      consequences,
      anxietyLevel,
      compulsiveBehavior,
    }

    setSequences([newSequence, ...sequences])
    resetForm()
  }

  const resetForm = () => {
    setTrigger({ description: "", type: "external" })
    setDoubt("")
    setConsequences("")
    setAnxietyLevel(5)
    setCompulsiveBehavior("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Record Doubt Sequence</CardTitle>
          <CardDescription>
            Track your obsessional sequence by identifying triggers, doubts, and responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Trigger Type</Label>
            <RadioGroup
              value={trigger.type}
              onValueChange={(value: "internal" | "external") => setTrigger((prev) => ({ ...prev, type: value }))}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="external" id="external" />
                <Label htmlFor="external">External Event</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="internal" id="internal" />
                <Label htmlFor="internal">Internal Thought</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Trigger Description</Label>
            <Textarea
              placeholder="What triggered your doubt?"
              value={trigger.description}
              onChange={(e) => setTrigger((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Initial Doubt ("Maybe I...")</Label>
            <Textarea placeholder="What doubt came to mind?" value={doubt} onChange={(e) => setDoubt(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Imagined Consequences</Label>
            <Textarea
              placeholder="What consequences did you imagine?"
              value={consequences}
              onChange={(e) => setConsequences(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Anxiety Level (1-10)</Label>
            <div className="flex items-center space-x-4">
              <Slider
                value={[anxietyLevel]}
                onValueChange={(value) => setAnxietyLevel(value[0])}
                min={1}
                max={10}
                step={1}
                className="flex-1"
              />
              <span className="w-12 text-center">{anxietyLevel}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Compulsive Behavior</Label>
            <Textarea
              placeholder="What did you do in response?"
              value={compulsiveBehavior}
              onChange={(e) => setCompulsiveBehavior(e.target.value)}
            />
          </div>

          <Button onClick={addSequence} className="w-full" disabled={!trigger.description || !doubt}>
            <Plus className="w-4 h-4 mr-2" />
            Add Sequence
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {sequences.map((sequence) => (
          <Card key={sequence.id} className="overflow-hidden">
            <CardHeader
              className="cursor-pointer"
              onClick={() => setExpandedId(expandedId === sequence.id ? null : sequence.id)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">{new Date(sequence.date).toLocaleDateString()}</CardTitle>
                  <CardDescription>{sequence.doubt}</CardDescription>
                </div>
                {expandedId === sequence.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
            {expandedId === sequence.id && (
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2">
                  <Label>Trigger ({sequence.trigger.type})</Label>
                  <p className="text-sm text-muted-foreground">{sequence.trigger.description}</p>
                </div>
                <div className="space-y-2">
                  <Label>Consequences</Label>
                  <p className="text-sm text-muted-foreground">{sequence.consequences}</p>
                </div>
                <div className="space-y-2">
                  <Label>Anxiety Level</Label>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(sequence.anxietyLevel / 10) * 100}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Compulsive Behavior</Label>
                  <p className="text-sm text-muted-foreground">{sequence.compulsiveBehavior}</p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}


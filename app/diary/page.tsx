"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Plus } from "lucide-react"

interface DiaryEntry {
  id: string
  date: string
  situation: string
  thoughts: string
  emotions: string
  physicalFeelings: string
  compulsions: string
  distressLevel: number
  timeSpent: number
}

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [situation, setSituation] = useState("")
  const [thoughts, setThoughts] = useState("")
  const [emotions, setEmotions] = useState("")
  const [physicalFeelings, setPhysicalFeelings] = useState("")
  const [compulsions, setCompulsions] = useState("")
  const [distressLevel, setDistressLevel] = useState(50)
  const [timeSpent, setTimeSpent] = useState(0)

  const addEntry = () => {
    if (!situation) return

    const newEntry = {
      id: Math.random().toString(),
      date: new Date().toISOString(),
      situation,
      thoughts,
      emotions,
      physicalFeelings,
      compulsions,
      distressLevel,
      timeSpent,
    }

    setEntries([newEntry, ...entries])
    resetForm()
  }

  const resetForm = () => {
    setSituation("")
    setThoughts("")
    setEmotions("")
    setPhysicalFeelings("")
    setCompulsions("")
    setDistressLevel(50)
    setTimeSpent(0)
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>OCD Symptom Diary</CardTitle>
          <CardDescription>Track your OCD symptoms, triggers, and responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Situation</Label>
              <Input
                placeholder="Where were you? What were you doing?"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Intrusive Thoughts</Label>
              <Textarea
                placeholder="What thoughts were going through your mind?"
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Emotions</Label>
              <Input placeholder="How did you feel?" value={emotions} onChange={(e) => setEmotions(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Physical Feelings</Label>
              <Input
                placeholder="What did you feel in your body?"
                value={physicalFeelings}
                onChange={(e) => setPhysicalFeelings(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Compulsions/Response</Label>
              <Textarea
                placeholder="What did you do in response?"
                value={compulsions}
                onChange={(e) => setCompulsions(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Distress Level (0-100)</Label>
              <Slider
                value={[distressLevel]}
                onValueChange={(value) => setDistressLevel(value[0])}
                min={0}
                max={100}
                step={1}
              />
              <div className="text-sm text-muted-foreground text-center">{distressLevel}</div>
            </div>

            <div className="space-y-2">
              <Label>Time Spent (minutes)</Label>
              <Input type="number" value={timeSpent} onChange={(e) => setTimeSpent(Number(e.target.value))} min={0} />
            </div>

            <Button onClick={addEntry} className="w-full" disabled={!situation}>
              <Plus className="w-4 h-4 mr-2" />
              Add Diary Entry
            </Button>
          </div>

          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleString()}</div>
                    <div className="font-medium">{entry.situation}</div>
                    {entry.thoughts && (
                      <div className="text-sm">
                        <span className="font-medium">Thoughts: </span>
                        {entry.thoughts}
                      </div>
                    )}
                    {entry.emotions && (
                      <div className="text-sm">
                        <span className="font-medium">Emotions: </span>
                        {entry.emotions}
                      </div>
                    )}
                    {entry.physicalFeelings && (
                      <div className="text-sm">
                        <span className="font-medium">Physical Feelings: </span>
                        {entry.physicalFeelings}
                      </div>
                    )}
                    {entry.compulsions && (
                      <div className="text-sm">
                        <span className="font-medium">Response: </span>
                        {entry.compulsions}
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="font-medium">Distress Level: </span>
                      {entry.distressLevel}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Time Spent: </span>
                      {entry.timeSpent} minutes
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


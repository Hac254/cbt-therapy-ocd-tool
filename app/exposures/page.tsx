"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Plus } from "lucide-react"

interface ExposureLog {
  id: string
  date: string
  situation: string
  initialDistress: number
  peakDistress: number
  finalDistress: number
  duration: number
  notes: string
}

export default function ExposuresPage() {
  const [logs, setLogs] = useState<ExposureLog[]>([])
  const [situation, setSituation] = useState("")
  const [initialDistress, setInitialDistress] = useState(50)
  const [peakDistress, setPeakDistress] = useState(50)
  const [finalDistress, setFinalDistress] = useState(50)
  const [duration, setDuration] = useState(30)
  const [notes, setNotes] = useState("")

  const addLog = () => {
    if (!situation) return

    const newLog = {
      id: Math.random().toString(),
      date: new Date().toISOString(),
      situation,
      initialDistress,
      peakDistress,
      finalDistress,
      duration,
      notes,
    }

    setLogs([newLog, ...logs])
    setSituation("")
    setInitialDistress(50)
    setPeakDistress(50)
    setFinalDistress(50)
    setDuration(30)
    setNotes("")
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Track Your Exposures</CardTitle>
          <CardDescription>Record your exposure exercises and track your progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Situation</Label>
              <Input
                placeholder="Describe the exposure situation..."
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Initial Distress (0-100)</Label>
              <Slider
                value={[initialDistress]}
                onValueChange={(value) => setInitialDistress(value[0])}
                min={0}
                max={100}
                step={1}
              />
              <div className="text-sm text-muted-foreground text-center">{initialDistress}</div>
            </div>

            <div className="space-y-2">
              <Label>Peak Distress (0-100)</Label>
              <Slider
                value={[peakDistress]}
                onValueChange={(value) => setPeakDistress(value[0])}
                min={0}
                max={100}
                step={1}
              />
              <div className="text-sm text-muted-foreground text-center">{peakDistress}</div>
            </div>

            <div className="space-y-2">
              <Label>Final Distress (0-100)</Label>
              <Slider
                value={[finalDistress]}
                onValueChange={(value) => setFinalDistress(value[0])}
                min={0}
                max={100}
                step={1}
              />
              <div className="text-sm text-muted-foreground text-center">{finalDistress}</div>
            </div>

            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} min={0} />
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                placeholder="Add any observations or reflections..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button onClick={addLog} className="w-full" disabled={!situation}>
              <Plus className="w-4 h-4 mr-2" />
              Add Exposure Log
            </Button>
          </div>

          <div className="space-y-4">
            {logs.map((log) => (
              <Card key={log.id}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="font-medium">{log.situation}</div>
                    <div className="text-sm text-muted-foreground">{new Date(log.date).toLocaleDateString()}</div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Initial</div>
                        <div>{log.initialDistress}</div>
                      </div>
                      <div>
                        <div className="font-medium">Peak</div>
                        <div>{log.peakDistress}</div>
                      </div>
                      <div>
                        <div className="font-medium">Final</div>
                        <div>{log.finalDistress}</div>
                      </div>
                    </div>
                    {log.notes && <div className="text-sm">{log.notes}</div>}
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


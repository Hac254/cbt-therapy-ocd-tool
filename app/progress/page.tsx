"use client"

import { useApp } from "@/context/app-context"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { useState } from "react"
import type { ProgressEntry } from "@/types"

export default function ProgressPage() {
  const { state, dispatch } = useApp()
  const [formData, setFormData] = useState({
    doubtIntensity: 5,
    realityConfidence: 5,
    compulsionFrequency: 5,
    notes: "",
  })

  const handleSubmit = () => {
    const newEntry: ProgressEntry = {
      id: Math.random().toString(),
      date: new Date().toISOString(),
      ...formData,
    }

    dispatch({ type: "ADD_PROGRESS_ENTRY", payload: newEntry })
    setFormData({
      doubtIntensity: 5,
      realityConfidence: 5,
      compulsionFrequency: 5,
      notes: "",
    })
  }

  const chartData = state.progressEntries.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(),
    doubt: entry.doubtIntensity,
    reality: entry.realityConfidence,
    compulsions: entry.compulsionFrequency,
  }))

  return (
    <div className="container py-8">
      <PageHeader
        title="Progress Tracker"
        description="Monitor your recovery journey and track improvements over time"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Progress Entry</CardTitle>
            <CardDescription>Record your daily measurements and observations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Doubt Intensity (1-10)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[formData.doubtIntensity]}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, doubtIntensity: value[0] }))}
                  min={1}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="w-12 text-center">{formData.doubtIntensity}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Reality Confidence (1-10)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[formData.realityConfidence]}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      realityConfidence: value[0],
                    }))
                  }
                  min={1}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="w-12 text-center">{formData.realityConfidence}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Compulsion Frequency (1-10)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[formData.compulsionFrequency]}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      compulsionFrequency: value[0],
                    }))
                  }
                  min={1}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="w-12 text-center">{formData.compulsionFrequency}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Any observations or reflections..."
              />
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Save Progress Entry
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>Visualize your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="doubt" stroke="#ef4444" name="Doubt Intensity" />
                  <Line type="monotone" dataKey="reality" stroke="#22c55e" name="Reality Confidence" />
                  <Line type="monotone" dataKey="compulsions" stroke="#3b82f6" name="Compulsion Frequency" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


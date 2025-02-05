"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Plus, Trash2 } from "lucide-react"

interface HierarchyItem {
  id: string
  situation: string
  distress: number
}

export default function HierarchyPage() {
  const [items, setItems] = useState<HierarchyItem[]>([])
  const [newSituation, setNewSituation] = useState("")
  const [newDistress, setNewDistress] = useState(50)

  const addItem = () => {
    if (!newSituation) return

    const newItem = {
      id: Math.random().toString(),
      situation: newSituation,
      distress: newDistress,
    }

    setItems([...items, newItem].sort((a, b) => b.distress - a.distress))
    setNewSituation("")
    setNewDistress(50)
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Build Your Exposure Hierarchy</CardTitle>
          <CardDescription>Add situations that trigger your OCD and rate how distressing they are</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Situation</Label>
              <Input
                placeholder="Describe a triggering situation..."
                value={newSituation}
                onChange={(e) => setNewSituation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Distress Level (0-100)</Label>
              <Slider
                value={[newDistress]}
                onValueChange={(value) => setNewDistress(value[0])}
                min={0}
                max={100}
                step={1}
              />
              <div className="text-sm text-muted-foreground text-center">{newDistress}</div>
            </div>

            <Button onClick={addItem} className="w-full" disabled={!newSituation}>
              <Plus className="w-4 h-4 mr-2" />
              Add to Hierarchy
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div>{item.situation}</div>
                  <div className="text-sm text-muted-foreground">Distress: {item.distress}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


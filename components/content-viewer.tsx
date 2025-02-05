"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlayCircle, Pause, RotateCcw, CheckCircle } from "lucide-react"

interface ContentViewerProps {
  type: "article" | "video"
  content: string
  onComplete: () => void
  initialProgress: number
}

export function ContentViewer({ type, content, onComplete, initialProgress }: ContentViewerProps) {
  const [progress, setProgress] = useState(initialProgress)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleProgress = () => {
    if (progress < 100) {
      setProgress(Math.min(progress + 10, 100))
    }
    if (progress + 10 >= 100) {
      onComplete()
    }
  }

  const resetProgress = () => {
    setProgress(0)
    setIsPlaying(false)
  }

  return (
    <Card className="border-primary/20">
      <CardContent className="pt-6">
        {type === "video" ? (
          <div className="space-y-4">
            <div className="relative aspect-video bg-black/10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {isPlaying ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-primary/90 hover:bg-primary text-white"
                    onClick={() => setIsPlaying(false)}
                  >
                    <Pause className="h-6 w-6" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-primary/90 hover:bg-primary text-white"
                    onClick={() => {
                      setIsPlaying(true)
                      handleProgress()
                    }}
                  >
                    <PlayCircle className="h-6 w-6" />
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{Math.round(progress)}% complete</span>
                <Button variant="ghost" size="sm" onClick={resetProgress}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="prose prose-green max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center gap-2">
                <Progress value={progress} className="w-32 h-2" />
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              {progress < 100 ? (
                <Button onClick={handleProgress}>Continue Reading</Button>
              ) : (
                <Button variant="outline" className="text-green-600" onClick={resetProgress}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completed
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


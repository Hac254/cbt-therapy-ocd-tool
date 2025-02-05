"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, PlayCircle } from "lucide-react"
import { ContentViewer } from "@/components/content-viewer"
import { learningContent } from "./content"

type ContentProgress = {
  [key: string]: number
}

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("basics")
  const [selectedContent, setSelectedContent] = useState<string | null>(null)
  const [progress, setProgress] = useState<ContentProgress>({})

  const calculateCategoryProgress = (category: string) => {
    const items = learningContent[category as keyof typeof learningContent]
    const totalProgress = items.reduce((acc, item) => acc + (progress[item.id] || 0), 0)
    return Math.round(totalProgress / items.length)
  }

  const handleComplete = (id: string) => {
    setProgress((prev) => ({ ...prev, [id]: 100 }))
  }

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-primary">Learn About OCD 📚</h1>
          <p className="text-lg text-muted-foreground">
            Explore our educational resources to better understand and manage OCD
          </p>
        </div>

        <Tabs defaultValue="basics" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="techniques">Techniques</TabsTrigger>
            <TabsTrigger value="coping">Coping Skills</TabsTrigger>
          </TabsList>

          {(Object.keys(learningContent) as Array<keyof typeof learningContent>).map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {/* Category Progress */}
              <Card className="bg-muted border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Section Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {calculateCategoryProgress(category)}% Complete
                    </span>
                  </div>
                  <Progress value={calculateCategoryProgress(category)} className="h-2" />
                </CardContent>
              </Card>

              {selectedContent ? (
                <div className="space-y-4">
                  <Button variant="ghost" className="text-primary" onClick={() => setSelectedContent(null)}>
                    ← Back to List
                  </Button>
                  {learningContent[category].map((item) => {
                    if (item.id === selectedContent) {
                      return (
                        <div key={item.id} className="space-y-4">
                          <h2 className="text-2xl font-bold text-primary">{item.title}</h2>
                          <p className="text-muted-foreground">{item.description}</p>
                          <ContentViewer
                            type={item.type as "article" | "video"}
                            content={item.content}
                            onComplete={() => handleComplete(item.id)}
                            initialProgress={progress[item.id] || 0}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              ) : (
                <div className="grid gap-4">
                  {learningContent[category].map((item) => (
                    <Card key={item.id} className="border-primary/20">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="flex items-center gap-2">
                              {item.type === "video" ? (
                                <PlayCircle className="h-5 w-5 text-primary" />
                              ) : (
                                <BookOpen className="h-5 w-5 text-primary" />
                              )}
                              {item.title}
                            </CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </div>
                          <div className="text-sm text-muted-foreground">{item.duration}</div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {progress[item.id] === 100 && <CheckCircle className="h-4 w-4 text-green-500" />}
                              <span className="text-sm text-muted-foreground">
                                {progress[item.id] === 100
                                  ? "Completed"
                                  : progress[item.id]
                                    ? `${progress[item.id]}% complete`
                                    : "Not started"}
                              </span>
                            </div>
                            <Button onClick={() => setSelectedContent(item.id)}>
                              {progress[item.id] === 100 ? "Review" : progress[item.id] ? "Continue" : "Start"}
                            </Button>
                          </div>
                          {progress[item.id] > 0 && <Progress value={progress[item.id]} className="h-2" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}


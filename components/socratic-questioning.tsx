"use client"

import { useState } from "react"
import { useApp } from "@/context/app-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { SocraticQuestion } from "@/types"

const QUESTION_PROMPTS = {
  thought: "What is the thought that's troubling you?",
  evidence: "What evidence supports this thought? What evidence contradicts it?",
  reality: "How do you know this thought reflects reality rather than imagination?",
  anxiety: "How does this thought affect your anxiety levels and behaviors?",
  conclusion: "What alternative explanations or perspectives might there be?",
}

export function SocraticQuestioning() {
  const { state, dispatch } = useApp()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    thought: "",
    evidence: "",
    reality: "",
    anxiety: "",
    conclusion: "",
  })

  const handleSubmit = () => {
    if (!formData.thought) return

    const newQuestion: SocraticQuestion = {
      id: Math.random().toString(),
      date: new Date().toISOString(),
      ...formData,
    }

    dispatch({ type: "ADD_SOCRATIC_QUESTION", payload: newQuestion })
    setFormData({
      thought: "",
      evidence: "",
      reality: "",
      anxiety: "",
      conclusion: "",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Thought Analysis</CardTitle>
          <CardDescription>Examine your thoughts through structured questioning</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(QUESTION_PROMPTS).map(([key, prompt]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor={key}>{prompt}</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{getTooltipContent(key)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id={key}
                value={formData[key as keyof typeof formData]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                placeholder={getPlaceholder(key)}
                className="min-h-[100px]"
              />
            </div>
          ))}

          <Button onClick={handleSubmit} className="w-full" disabled={!formData.thought}>
            Save Analysis
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {state.socraticQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader
              className="cursor-pointer"
              onClick={() => setExpandedId(expandedId === question.id ? null : question.id)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">{new Date(question.date).toLocaleDateString()}</CardTitle>
                  <CardDescription className="line-clamp-2">{question.thought}</CardDescription>
                </div>
                {expandedId === question.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
            {expandedId === question.id && (
              <CardContent className="space-y-4">
                {Object.entries(QUESTION_PROMPTS).map(([key, prompt]) => (
                  <div key={key} className="space-y-1">
                    <Label className="text-sm text-muted-foreground">{prompt}</Label>
                    <p className="text-sm whitespace-pre-wrap">{question[key as keyof SocraticQuestion]}</p>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

function getTooltipContent(key: string): string {
  switch (key) {
    case "thought":
      return "Describe the intrusive thought or worry that's bothering you. Be as specific as possible."
    case "evidence":
      return "List concrete evidence that supports and contradicts this thought. Focus on facts rather than feelings."
    case "reality":
      return "Consider whether this thought is based on what you can observe with your senses versus what you're imagining might happen."
    case "anxiety":
      return "Reflect on how this thought impacts your anxiety levels and what behaviors it triggers."
    case "conclusion":
      return "Try to generate alternative explanations or ways of looking at the situation."
    default:
      return ""
  }
}

function getPlaceholder(key: string): string {
  switch (key) {
    case "thought":
      return "Example: I might have left the stove on..."
    case "evidence":
      return "Supporting: I was distracted when leaving\nContradicting: I always check twice..."
    case "reality":
      return "What I can actually observe vs. what I'm imagining..."
    case "anxiety":
      return "How this affects my anxiety and what I do in response..."
    case "conclusion":
      return "Alternative ways to think about this situation..."
    default:
      return ""
  }
}


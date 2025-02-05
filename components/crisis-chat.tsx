"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getChatResponse } from "@/lib/chat-service"
import { Loader2, Send } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function CrisisChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Add initial welcome message
    setMessages([
      {
        id: "welcome",
        content: "Hi, I'm here to support you. How are you feeling right now?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef]) //Corrected dependency

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Math.random().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const { text } = await getChatResponse(input)
      const assistantMessage: Message = {
        id: Math.random().toString(),
        content: text,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      // Add error message to chat
      const errorMessage: Message = {
        id: Math.random().toString(),
        content:
          "I'm having trouble responding right now. Please call our crisis hotline at 1-800-273-8255 if you need immediate support.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <Card className="flex flex-col h-[600px] sm:h-[700px] md:h-[800px]">
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Crisis Support Chat</CardTitle>
        <CardDescription>Chat with a supportive AI counselor</CardDescription>
      </CardHeader>
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} gap-3 mb-4`}
          >
            {message.role === "assistant" && (
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-lg p-4 max-w-[80%] break-words ${
                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <p className="text-sm sm:text-base">{message.content}</p>
              <time className="text-xs opacity-70 mt-1 block">{message.timestamp.toLocaleTimeString()}</time>
            </div>
            {message.role === "user" && (
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg p-4">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
      </ScrollArea>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 min-h-[60px] max-h-[120px] resize-none"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="h-[60px] w-[60px]">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}


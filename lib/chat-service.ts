import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const SYSTEM_PROMPT = `You are a compassionate crisis support counselor trained in helping people with OCD and anxiety. Your responses should be:
1. Empathetic and understanding
2. Focused on immediate coping strategies
3. Encouraging professional help when needed
4. Based on evidence-based approaches
5. Clear and concise

Never encourage or validate compulsions. Instead, guide users towards healthy coping mechanisms.`

export async function getChatResponse(message: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: message,
      system: SYSTEM_PROMPT,
    })
    return { text }
  } catch (error) {
    console.error("Chat error:", error)
    throw new Error("Failed to get response")
  }
}


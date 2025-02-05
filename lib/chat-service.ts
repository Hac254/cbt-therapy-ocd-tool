const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

const SYSTEM_PROMPT = `You are a compassionate crisis support counselor trained in helping people with OCD and anxiety. Your responses should be:
1. Empathetic and understanding
2. Focused on immediate coping strategies
3. Encouraging professional help when needed
4. Based on evidence-based approaches
5. Clear and concise

Never encourage or validate compulsions. Instead, guide users towards healthy coping mechanisms.`;

export async function getChatResponse(message: string) {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${SYSTEM_PROMPT}\n\nUser message: ${message}`
          }]
        }],
        safetySettings: [
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
    return { text: data.candidates[0].content.parts[0].text };
  } catch (error) {
    console.error('Error in getChatResponse:', error);
    throw error;
  }
}


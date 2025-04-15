import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const { messages } = await request.json()

  // Get the last user message
  const lastUserMessage = messages.filter((m) => m.role === "user").pop()

  if (!lastUserMessage) {
    return NextResponse.json({ error: "No user message found" }, { status: 400 })
  }

  // Create a streaming response
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      // Simple response logic (replace with actual AI integration)
      const userInput = lastUserMessage.content.toLowerCase()
      let responseMessage = ""

      if (userInput.includes("hello") || userInput.includes("hi")) {
        responseMessage = "Hello! How can I assist you today?"
      } else if (userInput.includes("help")) {
        responseMessage =
          "I can help you with information, answer questions, or just chat. What would you like to know?"
      } else if (userInput.includes("bye") || userInput.includes("goodbye")) {
        responseMessage = "Goodbye! Feel free to come back if you have more questions."
      } else {
        responseMessage = `Thank you for your message. I'm a simple demo bot for now, but in a real implementation, I would connect to an AI service to provide helpful responses.`
      }

      // Stream the response character by character with delays
      for (let i = 0; i < responseMessage.length; i++) {
        const char = responseMessage[i]
        controller.enqueue(encoder.encode(char))
        // Add a small delay between characters to simulate typing
        await new Promise((resolve) => setTimeout(resolve, 20))
      }

      controller.close()
    },
  })

  return new Response(stream)
}

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    // Get the last user message
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()

    if (!lastUserMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 })
    }

    // Simple response logic (replace with actual AI integration)
    let responseMessage = ""
    const userInput = lastUserMessage.content.toLowerCase()

    if (userInput.includes("hello") || userInput.includes("hi")) {
      responseMessage = "Hello! How can I assist you today?"
    } else if (userInput.includes("help")) {
      responseMessage = "I can help you with information, answer questions, or just chat. What would you like to know?"
    } else if (userInput.includes("bye") || userInput.includes("goodbye")) {
      responseMessage = "Goodbye! Feel free to come back if you have more questions."
    } else {
      responseMessage = `Thank you for your message. I'm a simple demo bot for now, but in a real implementation, I would connect to an AI service to provide helpful responses.`
    }

    return NextResponse.json({ message: responseMessage })
  } catch (error) {
    console.error("Error processing chat request:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

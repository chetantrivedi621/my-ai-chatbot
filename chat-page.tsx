"use client"

import { useState, useRef, useEffect } from "react"
import { SendIcon, User, Bot } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hello! How can I help you today?" }])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError("")

    try {
      // Connect to your backend API
      // Adjust the URL to match your actual backend API endpoint
      // If your backend is running on a different port, use the full URL
      // e.g., http://localhost:5000/api/chat
      // Update the fetch URL to match your exact API endpoint
      // If your API is at a different path, adjust accordingly
      // Comment out the fetch code
      /*
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });
      // ... rest of the API handling code
      */

      // Mock response instead of API call
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

      // Simple response logic
      let responseMessage = ""
      const userInput = input.toLowerCase()

      if (userInput.includes("hello") || userInput.includes("hi")) {
        responseMessage = "Hello! How can I assist you today?"
      } else if (userInput.includes("help")) {
        responseMessage =
          "I can help you with information, answer questions, or just chat. What would you like to know?"
      } else if (userInput.includes("bye") || userInput.includes("goodbye")) {
        responseMessage = "Goodbye! Feel free to come back if you have more questions."
      } else {
        responseMessage = `Thank you for your message. I'm a simple demo bot that works without an API backend. In a real implementation, I would connect to an AI service to provide helpful responses.`
      }

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: responseMessage,
        },
      ])
    } catch (error) {
      console.error("Error:", error)
      setError(error.message || "An unexpected error occurred")

      // Add error message as assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error connecting to the backend. Please check your server connection.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-800">AI Chatbot</h1>
        {error && <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded-md">API Error: {error}</div>}
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
              }`}
            >
              <div className={`rounded-full p-2 ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                {message.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.role === "user" ? "bg-blue-500 text-white" : "bg-white border border-gray-200"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="rounded-full p-2 bg-gray-200">
                <Bot size={16} />
              </div>
              <div className="rounded-lg px-4 py-2 bg-white border border-gray-200">
                <p>Thinking...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <SendIcon size={18} />
          </button>
        </div>
      </form>
    </div>
  )
}

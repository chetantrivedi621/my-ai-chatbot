"use client"

import { useState, useRef, useEffect } from "react"

export default function EnhancedChatPage() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hello! How can I help you today?" }])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

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
        responseMessage = `Thank you for your message. I'm here to help with any questions you might have.`
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

      // Add error message as assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Navigation bar - matching your existing design */}
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Chatbot</h1>
        <nav className="flex space-x-4">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-700">
            Chat
          </a>
          <a href="#" className="hover:underline">
            Profile
          </a>
          <button className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-400">Logout</button>
        </nav>
      </header>

      {/* Chat title */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">AI Chatbot</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-start space-x-2 max-w-[80%]`}>
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm">🤖</span>
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-2 ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm">🤖</span>
              </div>
              <div className="rounded-lg px-4 py-2 bg-gray-100">
                <p>Thinking...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form - matching your existing design */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  )
}

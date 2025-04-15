"use client"

import { useState, useRef, useEffect } from "react"
import { SendIcon, RefreshCw, User, Bot } from "lucide-react"

export default function StreamingChatPage() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hello! How can I help you today?" }])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentStreamedMessage, setCurrentStreamedMessage] = useState("")
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages, currentStreamedMessage])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isStreaming) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsStreaming(true)
    setCurrentStreamedMessage("")

    try {
      // Replace with your actual streaming API endpoint
      const response = await fetch("/api/chat-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading

        if (value) {
          const chunkText = decoder.decode(value)
          setCurrentStreamedMessage((prev) => prev + chunkText)
        }
      }

      // When streaming is complete, add the full message to the chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: currentStreamedMessage,
        },
      ])
      setCurrentStreamedMessage("")
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
      setCurrentStreamedMessage("")
    } finally {
      setIsStreaming(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-800">AI Chatbot (Streaming)</h1>
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

        {/* Streaming message */}
        {isStreaming && currentStreamedMessage && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="rounded-full p-2 bg-gray-200">
                <Bot size={16} />
              </div>
              <div className="rounded-lg px-4 py-2 bg-white border border-gray-200">
                <p className="whitespace-pre-wrap">{currentStreamedMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isStreaming && !currentStreamedMessage && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="rounded-full p-2 bg-gray-200">
                <Bot size={16} />
              </div>
              <div className="rounded-lg px-4 py-2 bg-white border border-gray-200">
                <RefreshCw size={16} className="animate-spin" />
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
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <SendIcon size={18} />
          </button>
        </div>
      </form>
    </div>
  )
}

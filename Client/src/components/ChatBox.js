import React, { useState, useEffect, useRef, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function ChatBox({ messages, setMessages }) {
  const { user } = useAuth();
  const { chatHistory, setChatHistory } = useContext(ChatContext);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Common emojis with labels for better accessibility
  const commonEmojis = [
    { emoji: '😊', label: 'smile' },
    { emoji: '😂', label: 'joy' },
    { emoji: '👍', label: 'thumbs up' },
    { emoji: '❤️', label: 'heart' },
    { emoji: '🎉', label: 'party' },
    { emoji: '🤔', label: 'thinking' },
    { emoji: '👋', label: 'wave' },
    { emoji: '✨', label: 'sparkles' },
    { emoji: '🙌', label: 'raised hands' },
    { emoji: '🔥', label: 'fire' }
  ];

  // Update chat history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setChatHistory(prev => prev.map(chat => 
        chat.title === 'New chat' 
          ? { ...chat, messages }
          : chat
      ));
    }
  }, [messages, setChatHistory]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    }]);

    try {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add bot response
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'bot',
        content: "I'm here to help! This is a modern AI chatbot interface.",
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'bot',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toISOString(),
        error: true
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addEmoji = (emoji) => {
    setInput(prev => prev + emoji);
    setShowEmojiPicker(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.role === 'user' ? 'userMessage' : ''}`}
          >
            <div className={msg.role === 'user' ? 'messageContent userMessageContent' : 'messageContent botMessageContent'}>
              <p>{msg.content}</p>
              <span className="text-xs mt-1 block opacity-70">
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="message">
            <div className="messageContent botMessageContent">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4">
        <div className="flex items-center gap-2 max-w-screen-xl mx-auto">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-400 hover:text-gray-300 focus:outline-none"
            aria-label="Open emoji picker"
          >
            😊
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full left-0 mb-2 bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-700 grid grid-cols-5 gap-2">
              {commonEmojis.map(({ emoji, label }) => (
                <button
                  key={label}
                  onClick={() => addEmoji(emoji)}
                  className="hover:bg-gray-700 p-1 rounded transition-colors"
                  aria-label={`Add ${label} emoji`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="messageInput"
            disabled={isLoading}
          />

          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="sendButton"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
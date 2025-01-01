'use client'

import { useState } from 'react'
import { MessageCircle, X, Minimize2, Maximize2, Send } from 'lucide-react'
import { useChat } from 'ai/react'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      {!isOpen ? (
        <div className="relative">
          <button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110"
          >
            <MessageCircle size={24} />
          </button>
          {isHovered && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white">
              Chat with me!
            </div>
          )}
        </div>
      ) : (
        <div
          className={`${
            isMinimized ? 'h-12' : 'h-[500px]'
          } w-[350px] overflow-hidden rounded-lg bg-white shadow-xl transition-all`}
        >
          <div className="flex h-12 items-center justify-between border-b bg-blue-500 px-4">
            <span className="text-sm font-medium text-white">Chat with Eden</span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white"
              >
                {isMinimized ? (
                  <Maximize2 size={18} />
                ) : (
                  <Minimize2 size={18} />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="flex h-[calc(100%-3rem)] flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="mb-4 text-center text-sm text-gray-500">
                  👋 Hi! I&apos;m Eden&apos;s AI assistant. Ask me anything about Eden&apos;s skills and experience!
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleSubmit}
              className="border-t bg-white p-4"
            >
              <div className="flex rounded-lg border">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                  className="flex-1 rounded-l-lg px-4 py-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-r-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


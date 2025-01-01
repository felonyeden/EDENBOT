'use client'

import { useChat } from 'ai/react'
import { SendIcon } from 'lucide-react'

export function ChatContent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="flex h-full flex-col">
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
            <SendIcon size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}


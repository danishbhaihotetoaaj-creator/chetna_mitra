'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Smile } from 'lucide-react'
import { useChat } from '@/contexts/ChatContext'
import { useSocket } from '@/contexts/SocketContext'

export function ChatInput() {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { addMessage } = useChat()
  const { sendMessage } = useSocket()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      addMessage(message.trim())
      sendMessage(message.trim())
      setMessage('')
      setIsTyping(false)
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInput = () => {
    setIsTyping(true)
    // Reset typing indicator after delay
    setTimeout(() => setIsTyping(false), 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-3">
      {/* Emoji Button */}
      <button
        type="button"
        className="p-2 hover:bg-dark-800 rounded-lg transition-colors text-dark-400 hover:text-white"
        title="Add emoji"
      >
        <Smile className="w-5 h-5" />
      </button>

      {/* Text Input */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none overflow-hidden"
          rows={1}
          maxLength={2000}
        />
        
        {/* Character Count */}
        {message.length > 0 && (
          <div className="absolute bottom-2 right-2 text-xs text-dark-400">
            {message.length}/2000
          </div>
        )}
      </div>

      {/* Send Button */}
      <button
        type="submit"
        disabled={!message.trim()}
        className="p-3 bg-primary-600 hover:bg-primary-700 disabled:bg-dark-700 disabled:text-dark-400 text-white rounded-xl transition-colors disabled:cursor-not-allowed"
        title="Send message"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  )
}
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Message } from '@/contexts/ChatContext'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="text-center text-dark-400 py-8">
        <p className="text-sm">No messages yet. Start the conversation!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {message.isTyping ? (
              <TypingIndicator />
            ) : (
              <MessageBubble message={message} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
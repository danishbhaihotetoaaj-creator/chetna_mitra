'use client'

import { motion } from 'framer-motion'

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="chat-bubble chat-bubble-ai">
        <div className="typing-indicator">
          <motion.div
            className="typing-dot"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="typing-dot"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.div
            className="typing-dot"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
        </div>
        <div className="text-xs text-dark-400 mt-2">AI is typing...</div>
      </div>
    </div>
  )
}
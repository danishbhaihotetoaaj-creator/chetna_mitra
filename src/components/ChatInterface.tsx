'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { VoiceInput } from './VoiceInput'
import { FileUploader } from './FileUploader'
import { WebSearchButton } from './WebSearchButton'
import { PromptEnhancer } from './PromptEnhancer'
import { useChat } from '@/contexts/ChatContext'
import { useSocket } from '@/contexts/SocketContext'

export function ChatInterface() {
  const { currentConversation, state } = useChat()
  const { isConnected } = useSocket()
  const [showVoiceInput, setShowVoiceInput] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showPromptEnhancer, setShowPromptEnhancer] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentConversation?.messages])

  if (!currentConversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">💬</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Chetna Mitra</h2>
          <p className="text-dark-400 mb-6 max-w-md">
            Your intelligent AI chat companion. Start a new conversation to begin chatting with AI.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 text-sm text-dark-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Voice input support</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-dark-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>File sharing & previews</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-dark-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Web search integration</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-dark-950">
      {/* Connection Status Bar */}
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 text-white px-4 py-2 text-center text-sm"
        >
          ⚠️ Connection lost. Trying to reconnect...
        </motion.div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <MessageList messages={currentConversation.messages} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-dark-700 bg-dark-900 p-4">
        <div className="space-y-4">
          {/* Prompt Enhancer */}
          {showPromptEnhancer && (
            <PromptEnhancer onClose={() => setShowPromptEnhancer(false)} />
          )}

          {/* Main Input */}
          <div className="flex items-end space-x-3">
            {/* File Upload */}
            <button
              onClick={() => setShowFileUpload(!showFileUpload)}
              className="p-3 hover:bg-dark-800 rounded-lg transition-colors text-dark-400 hover:text-white"
              title="Upload files"
            >
              📎
            </button>

            {/* Voice Input */}
            <button
              onClick={() => setShowVoiceInput(!showVoiceInput)}
              className={`p-3 rounded-lg transition-colors ${
                showVoiceInput 
                  ? 'bg-red-600 text-white' 
                  : 'hover:bg-dark-800 text-dark-400 hover:text-white'
              }`}
              title="Voice input"
            >
              🎤
            </button>

            {/* Web Search */}
            <WebSearchButton />

            {/* Prompt Enhancer Toggle */}
            <button
              onClick={() => setShowPromptEnhancer(!showPromptEnhancer)}
              className="p-3 hover:bg-dark-800 rounded-lg transition-colors text-dark-400 hover:text-white"
              title="Enhance prompt"
            >
              ✨
            </button>

            {/* Main Chat Input */}
            <div className="flex-1">
              <ChatInput />
            </div>
          </div>

          {/* Voice Input Interface */}
          <AnimatePresence>
            {showVoiceInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VoiceInput onClose={() => setShowVoiceInput(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* File Upload Interface */}
          <AnimatePresence>
            {showFileUpload && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FileUploader onClose={() => setShowFileUpload(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
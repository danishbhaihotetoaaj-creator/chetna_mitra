'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2, Heart, MessageSquare, Copy, Check } from 'lucide-react'
import { Message } from '@/contexts/ChatContext'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false)
  const [copied, setCopied] = useState(false)
  const [reactions, setReactions] = useState(message.reactions || [])

  const isUser = message.role === 'user'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      toast.success('Message copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy message')
    }
  }

  const handleReaction = (reaction: string) => {
    if (reactions.includes(reaction)) {
      setReactions(reactions.filter(r => r !== reaction))
    } else {
      setReactions([...reactions, reaction])
    }
  }

  const renderContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="space-y-2">
            <img 
              src={message.metadata?.url || ''} 
              alt={message.metadata?.fileName || 'Image'}
              className="max-w-full rounded-lg max-h-96 object-cover"
            />
            {message.content && (
              <p className="text-sm">{message.content}</p>
            )}
          </div>
        )
      
      case 'audio':
        return (
          <div className="space-y-2">
            <audio controls className="w-full">
              <source src={message.metadata?.url || ''} type={message.metadata?.fileType || 'audio/*'} />
              Your browser does not support the audio element.
            </audio>
            {message.content && (
              <p className="text-sm">{message.content}</p>
            )}
          </div>
        )
      
      case 'file':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-3 bg-dark-800 rounded-lg border border-dark-600">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                📄
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{message.metadata?.fileName}</p>
                <p className="text-xs text-dark-400">{message.metadata?.fileSize}</p>
              </div>
              <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
            {message.content && (
              <p className="text-sm">{message.content}</p>
            )}
          </div>
        )
      
      default:
        return <p className="whitespace-pre-wrap">{message.content}</p>
    }
  }

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`relative max-w-[80%] group`}>
        {/* Message Bubble */}
        <div
          className={`chat-bubble ${
            isUser ? 'chat-bubble-user' : 'chat-bubble-ai'
          }`}
        >
          {renderContent()}
          
          {/* Timestamp */}
          <div className={`text-xs mt-2 ${
            isUser ? 'text-primary-100' : 'text-dark-400'
          }`}>
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </div>
        </div>

        {/* Actions */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`absolute top-0 ${
                isUser ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'
              } -translate-y-full bg-dark-800 border border-dark-600 rounded-lg p-2 shadow-xl z-10`}
            >
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
                  title="Copy message"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => handleReaction('❤️')}
                  className={`p-2 rounded-lg transition-colors ${
                    reactions.includes('❤️') ? 'bg-red-500/20 text-red-400' : 'hover:bg-dark-700'
                  }`}
                  title="Like"
                >
                  <Heart className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleReaction('💬')}
                  className={`p-2 rounded-lg transition-colors ${
                    reactions.includes('💬') ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-dark-700'
                  }`}
                  title="Reply"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                
                <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors" title="Share">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className="flex items-center space-x-1 mt-2">
            {reactions.map((reaction, index) => (
              <span
                key={index}
                className="text-sm bg-dark-800 px-2 py-1 rounded-full border border-dark-600"
              >
                {reaction}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
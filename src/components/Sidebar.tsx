'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  MessageCircle, 
  Users, 
  Globe, 
  Star, 
  Trash2, 
  Search,
  X,
  Settings,
  HelpCircle
} from 'lucide-react'
import { useChat } from '@/contexts/ChatContext'
import { formatDistanceToNow } from 'date-fns'

interface SidebarProps {
  onClose: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'conversations' | 'community'>('conversations')
  const [searchQuery, setSearchQuery] = useState('')
  const { 
    state, 
    dispatch, 
    currentConversation, 
    createConversation, 
    deleteConversation,
    setCurrentConversation 
  } = useChat()

  const handleNewConversation = () => {
    const conversationId = createConversation()
    setCurrentConversation(conversationId)
  }

  const filteredConversations = state.conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col bg-dark-900">
      {/* Header */}
      <div className="p-4 border-b border-dark-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Chat</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-dark-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={handleNewConversation}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-dark-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-dark-700">
        <button
          onClick={() => setActiveTab('conversations')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 transition-colors ${
            activeTab === 'conversations'
              ? 'bg-dark-800 text-primary-400 border-b-2 border-primary-400'
              : 'text-dark-300 hover:text-white hover:bg-dark-800'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Conversations</span>
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 transition-colors ${
            activeTab === 'community'
              ? 'bg-dark-800 text-primary-400 border-b-2 border-primary-400'
              : 'text-dark-300 hover:text-white hover:bg-dark-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">Community</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'conversations' ? (
          <ConversationsList
            conversations={filteredConversations}
            currentConversationId={currentConversation?.id}
            onSelectConversation={(id) => setCurrentConversation(id)}
            onDeleteConversation={deleteConversation}
          />
        ) : (
          <CommunitySection />
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-dark-700">
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-dark-800 rounded-lg transition-colors text-dark-300 hover:text-white">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-dark-800 rounded-lg transition-colors text-dark-300 hover:text-white">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Help & Support</span>
          </button>
        </div>
      </div>
    </div>
  )
}

interface ConversationsListProps {
  conversations: any[]
  currentConversationId: string | null
  onSelectConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
}

function ConversationsList({ 
  conversations, 
  currentConversationId, 
  onSelectConversation, 
  onDeleteConversation 
}: ConversationsListProps) {
  if (conversations.length === 0) {
    return (
      <div className="p-8 text-center text-dark-400">
        <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm">No conversations yet</p>
        <p className="text-xs mt-1">Start a new chat to begin</p>
      </div>
    )
  }

  return (
    <div className="p-2">
      {conversations.map((conversation) => (
        <motion.div
          key={conversation.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`sidebar-item ${
            conversation.id === currentConversationId ? 'sidebar-item-active' : ''
          }`}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <MessageCircle className="w-4 h-4 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{conversation.title}</p>
            <p className="text-xs text-dark-400 truncate">
              {conversation.messages.length > 0 
                ? conversation.messages[conversation.messages.length - 1].content.slice(0, 30) + '...'
                : 'No messages yet'
              }
            </p>
            <p className="text-xs text-dark-500 mt-1">
              {formatDistanceToNow(conversation.updatedAt, { addSuffix: true })}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDeleteConversation(conversation.id)
            }}
            className="p-1 hover:bg-dark-700 rounded opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 className="w-3 h-3 text-red-400" />
          </button>
        </motion.div>
      ))}
    </div>
  )
}

function CommunitySection() {
  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="text-center">
          <Users className="w-12 h-12 mx-auto mb-3 text-primary-400" />
          <h3 className="text-lg font-semibold mb-2">Join the Community</h3>
          <p className="text-sm text-dark-400 mb-4">
            Connect with other users, share insights, and discover new conversations
          </p>
          <button className="btn-primary">
            Explore Community
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-dark-800 rounded-lg">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Trending Topics</p>
              <p className="text-xs text-dark-400">See what's popular today</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-dark-800 rounded-lg">
            <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Global Discussions</p>
              <p className="text-xs text-dark-400">Connect worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
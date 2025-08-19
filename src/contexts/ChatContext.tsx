'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  type: 'text' | 'image' | 'audio' | 'file'
  metadata?: {
    fileName?: string
    fileSize?: string
    fileType?: string
    url?: string
  }
  reactions?: string[]
  isTyping?: boolean
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

interface ChatState {
  conversations: Conversation[]
  currentConversationId: string | null
  isLoading: boolean
  error: string | null
  searchQuery: string
  isSearching: boolean
}

type ChatAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_CONVERSATION'; payload: Conversation }
  | { type: 'UPDATE_CONVERSATION'; payload: { id: string; updates: Partial<Conversation> } }
  | { type: 'DELETE_CONVERSATION'; payload: string }
  | { type: 'SET_CURRENT_CONVERSATION'; payload: string | null }
  | { type: 'ADD_MESSAGE'; payload: { conversationId: string; message: Message } }
  | { type: 'UPDATE_MESSAGE'; payload: { conversationId: string; messageId: string; updates: Partial<Message> } }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCHING'; payload: boolean }

const initialState: ChatState = {
  conversations: [],
  currentConversationId: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  isSearching: false,
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        currentConversationId: action.payload.id,
      }
    
    case 'UPDATE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.id
            ? { ...conv, ...action.payload.updates, updatedAt: new Date() }
            : conv
        ),
      }
    
    case 'DELETE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.filter(conv => conv.id !== action.payload),
        currentConversationId: state.currentConversationId === action.payload ? null : state.currentConversationId,
      }
    
    case 'SET_CURRENT_CONVERSATION':
      return { ...state, currentConversationId: action.payload }
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? {
                ...conv,
                messages: [...conv.messages, action.payload.message],
                updatedAt: new Date(),
                title: conv.messages.length === 0 ? action.payload.message.content.slice(0, 50) + '...' : conv.title,
              }
            : conv
        ),
      }
    
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? {
                ...conv,
                messages: conv.messages.map(msg =>
                  msg.id === action.payload.messageId
                    ? { ...msg, ...action.payload.updates }
                    : msg
                ),
              }
            : conv
        ),
      }
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload }
    
    case 'SET_SEARCHING':
      return { ...state, isSearching: action.payload }
    
    default:
      return state
  }
}

interface ChatContextType {
  state: ChatState
  dispatch: React.Dispatch<ChatAction>
  currentConversation: Conversation | null
  addMessage: (content: string, type?: Message['type'], metadata?: Message['metadata']) => void
  createConversation: () => string
  deleteConversation: (id: string) => void
  searchConversations: (query: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const currentConversation = state.currentConversationId
    ? state.conversations.find(conv => conv.id === state.currentConversationId) || null
    : null

  const addMessage = (content: string, type: Message['type'] = 'text', metadata?: Message['metadata']) => {
    if (!state.currentConversationId) {
      const conversationId = createConversation()
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversationId })
    }

    const message: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      type,
      metadata,
    }

    dispatch({
      type: 'ADD_MESSAGE',
      payload: { conversationId: state.currentConversationId!, message },
    })
  }

  const createConversation = (): string => {
    const conversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    }

    dispatch({ type: 'ADD_CONVERSATION', payload: conversation })
    return conversation.id
  }

  const deleteConversation = (id: string) => {
    dispatch({ type: 'DELETE_CONVERSATION', payload: id })
  }

  const searchConversations = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
    dispatch({ type: 'SET_SEARCHING', payload: true })
    
    // Simulate search delay
    setTimeout(() => {
      dispatch({ type: 'SET_SEARCHING', payload: false })
    }, 1000)
  }

  const value: ChatContextType = {
    state,
    dispatch,
    currentConversation,
    addMessage,
    createConversation,
    deleteConversation,
    searchConversations,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
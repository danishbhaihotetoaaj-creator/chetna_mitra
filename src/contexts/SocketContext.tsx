'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import { useChat } from './ChatContext'
import { Message } from './ChatContext'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  sendMessage: (message: string) => void
  joinRoom: (roomId: string) => void
  leaveRoom: (roomId: string) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { dispatch, currentConversation } = useChat()

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      transports: ['websocket'],
      autoConnect: true,
    })

    socketInstance.on('connect', () => {
      console.log('Connected to server')
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server')
      setIsConnected(false)
    })

    socketInstance.on('message', (data: { message: Message; conversationId: string }) => {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { conversationId: data.conversationId, message: data.message },
      })
    })

    socketInstance.on('typing', (data: { conversationId: string; isTyping: boolean }) => {
      if (currentConversation?.id === data.conversationId) {
        // Add typing indicator
        const typingMessage: Message = {
          id: 'typing-' + Date.now(),
          content: '',
          role: 'assistant',
          timestamp: new Date(),
          type: 'text',
          isTyping: true,
        }
        
        dispatch({
          type: 'ADD_MESSAGE',
          payload: { conversationId: data.conversationId, message: typingMessage },
        })
      }
    })

    socketInstance.on('error', (error: string) => {
      console.error('Socket error:', error)
      dispatch({ type: 'SET_ERROR', payload: error })
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [dispatch, currentConversation?.id])

  const sendMessage = (message: string) => {
    if (socket && currentConversation) {
      socket.emit('send_message', {
        content: message,
        conversationId: currentConversation.id,
        timestamp: new Date(),
      })
    }
  }

  const joinRoom = (roomId: string) => {
    if (socket) {
      socket.emit('join_room', roomId)
    }
  }

  const leaveRoom = (roomId: string) => {
    if (socket) {
      socket.emit('leave_room', roomId)
    }
  }

  const value: SocketContextType = {
    socket,
    isConnected,
    sendMessage,
    joinRoom,
    leaveRoom,
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
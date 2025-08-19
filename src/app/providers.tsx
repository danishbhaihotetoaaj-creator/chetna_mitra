'use client'

import { ReactNode } from 'react'
import { ChatProvider } from '@/contexts/ChatContext'
import { SocketProvider } from '@/contexts/SocketContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <SocketProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </SocketProvider>
    </ThemeProvider>
  )
}
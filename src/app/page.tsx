'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChatInterface } from '@/components/ChatInterface'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { useChat } from '@/contexts/ChatContext'

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentConversation } = useChat()

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed lg:relative lg:translate-x-0 z-30 w-80 h-full bg-dark-900 border-r border-dark-700"
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 flex flex-col">
          <ChatInterface />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
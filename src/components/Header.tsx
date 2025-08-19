'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Sun, Moon, Search, Bell, User, Settings, LogOut } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useSocket } from '@/contexts/SocketContext'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { theme, setTheme, isDark } = useTheme()
  const { isConnected } = useSocket()

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <header className="bg-dark-900 border-b border-dark-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-dark-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <h1 className="text-xl font-bold text-gradient">Chetna Mitra</h1>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Connection Status */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-dark-800 rounded-lg">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-dark-300">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
            title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button className="p-2 hover:bg-dark-800 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 hover:bg-dark-800 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-xl z-50"
              >
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-dark-700 rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-dark-700 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <hr className="border-dark-600 my-2" />
                  <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-dark-700 rounded-lg transition-colors text-red-400">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Settings, X, Shield, Eye, Lock, Globe } from 'lucide-react'
import Cookies from 'js-cookie'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false
  })

  useEffect(() => {
    const consentGiven = Cookies.get('cookie-consent')
    if (!consentGiven) {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    }
    
    setPreferences(allPreferences)
    savePreferences(allPreferences)
    setShowBanner(false)
    toast.success('All cookies accepted')
  }

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
    
    setPreferences(necessaryOnly)
    savePreferences(necessaryOnly)
    setShowBanner(false)
    toast.success('Necessary cookies accepted')
  }

  const savePreferences = (prefs: CookiePreferences) => {
    Cookies.set('cookie-consent', 'true', { expires: 365 })
    Cookies.set('cookie-preferences', JSON.stringify(prefs), { expires: 365 })
    
    // Apply preferences
    if (prefs.analytics) {
      // Enable analytics
      console.log('Analytics cookies enabled')
    }
    
    if (prefs.marketing) {
      // Enable marketing
      console.log('Marketing cookies enabled')
    }
    
    if (prefs.preferences) {
      // Enable preferences
      console.log('Preference cookies enabled')
    }
  }

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value }
    setPreferences(newPreferences)
  }

  const saveCustomPreferences = () => {
    savePreferences(preferences)
    setShowSettings(false)
    toast.success('Cookie preferences saved')
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-dark-800 border-t border-dark-600 p-4"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold mb-1">We use cookies</h3>
                  <p className="text-xs text-dark-400 max-w-2xl">
                    We use cookies and similar technologies to help personalize content, 
                    provide and improve our services, and analyze our traffic. 
                    By clicking "Accept All", you consent to our use of cookies.
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-dark-400">
                    <a href="/privacy" className="hover:text-primary-400 transition-colors">
                      Privacy Policy
                    </a>
                    <a href="/terms" className="hover:text-primary-400 transition-colors">
                      Terms of Service
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 flex-shrink-0">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-sm border border-dark-600 hover:border-dark-500 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 text-sm bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                >
                  Necessary Only
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 border border-dark-600 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Cookie Preferences</h3>
                    <p className="text-sm text-dark-400">Manage your cookie settings</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cookie Categories */}
              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="p-4 bg-dark-900 border border-dark-600 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <div>
                        <h4 className="font-medium">Necessary Cookies</h4>
                        <p className="text-sm text-dark-400">Essential for the website to function</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-400">Always Active</span>
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="w-4 h-4 text-primary-600 bg-dark-700 border-dark-600 rounded focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-dark-400">
                    These cookies are necessary for the website to function and cannot be switched off.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 bg-dark-900 border border-dark-600 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-blue-400" />
                      <div>
                        <h4 className="font-medium">Analytics Cookies</h4>
                        <p className="text-sm text-dark-400">Help us understand how visitors interact</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => updatePreference('analytics', e.target.checked)}
                      className="w-4 h-4 text-primary-600 bg-dark-700 border-dark-600 rounded focus:ring-primary-500"
                    />
                  </div>
                  <p className="text-xs text-dark-400">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="p-4 bg-dark-900 border border-dark-600 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-purple-400" />
                      <div>
                        <h4 className="font-medium">Marketing Cookies</h4>
                        <p className="text-sm text-dark-400">Used to deliver personalized advertisements</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => updatePreference('marketing', e.target.checked)}
                      className="w-4 h-4 text-primary-600 bg-dark-700 border-dark-600 rounded focus:ring-primary-500"
                    />
                  </div>
                  <p className="text-xs text-dark-400">
                    These cookies are used to deliver personalized advertisements.
                  </p>
                </div>

                {/* Preference Cookies */}
                <div className="p-4 bg-dark-900 border border-dark-600 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-orange-400" />
                      <div>
                        <h4 className="font-medium">Preference Cookies</h4>
                        <p className="text-sm text-dark-400">Remember your settings and preferences</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.preferences}
                      onChange={(e) => updatePreference('preferences', e.target.checked)}
                      className="w-4 h-4 text-primary-600 bg-dark-700 border-dark-600 rounded focus:ring-primary-500"
                    />
                  </div>
                  <p className="text-xs text-dark-400">
                    These cookies remember your settings and preferences for a better experience.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCustomPreferences}
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  Save Preferences
                </button>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-dark-600">
                <p className="text-xs text-dark-400 text-center">
                  You can change these settings at any time by clicking the cookie settings link in our footer.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Simple toast function (you can replace this with react-hot-toast)
function toast(message: string) {
  console.log(message)
}
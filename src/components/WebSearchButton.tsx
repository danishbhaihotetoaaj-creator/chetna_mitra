'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Globe, X, ExternalLink, Loader } from 'lucide-react'
import { useChat } from '@/contexts/ChatContext'
import toast from 'react-hot-toast'

export function WebSearchButton() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const { currentConversation } = useChat()

  const triggerWebSearch = async () => {
    if (!currentConversation?.messages.length) {
      toast.error('Start a conversation first to use web search')
      return
    }

    setIsSearching(true)
    setShowResults(true)

    try {
      // Simulate web search API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock search results
      const mockResults = [
        {
          id: 1,
          title: 'Latest AI Developments in 2024',
          url: 'https://example.com/ai-developments-2024',
          snippet: 'Recent breakthroughs in artificial intelligence and machine learning technologies...',
          source: 'TechNews.com'
        },
        {
          id: 2,
          title: 'Understanding GPT-4 and Its Capabilities',
          url: 'https://example.com/gpt4-capabilities',
          snippet: 'A comprehensive guide to OpenAI\'s GPT-4 model and its various applications...',
          source: 'AIInsights.org'
        },
        {
          id: 3,
          title: 'The Future of Conversational AI',
          url: 'https://example.com/future-conversational-ai',
          snippet: 'Exploring the evolution of chatbots and conversational AI systems...',
          source: 'FutureTech.com'
        }
      ]
      
      setSearchResults(mockResults)
      toast.success('Web search completed!')
    } catch (error) {
      toast.error('Web search failed. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const closeResults = () => {
    setShowResults(false)
    setSearchResults([])
  }

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <button
        onClick={triggerWebSearch}
        disabled={isSearching}
        className="p-3 hover:bg-dark-800 rounded-lg transition-colors text-dark-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        title="Web search"
      >
        {isSearching ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <Globe className="w-5 h-5" />
        )}
      </button>

      {/* Search Results Overlay */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeResults}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-dark-800 border border-dark-600 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Web Search Results</h3>
                    <p className="text-sm text-dark-400">Powered by GPT-4o Mini</p>
                  </div>
                </div>
                <button
                  onClick={closeResults}
                  className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Status */}
              {isSearching && (
                <div className="text-center py-8">
                  <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-400" />
                  <p className="text-dark-300">Searching the web...</p>
                  <p className="text-sm text-dark-400 mt-2">This may take a few seconds</p>
                </div>
              )}

              {/* Results */}
              {!isSearching && searchResults.length > 0 && (
                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-dark-900 border border-dark-600 rounded-lg hover:border-dark-500 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-primary-400 mb-2 line-clamp-2">
                            {result.title}
                          </h4>
                          <p className="text-sm text-dark-300 mb-2 line-clamp-3">
                            {result.snippet}
                          </p>
                          <div className="flex items-center space-x-3 text-xs text-dark-400">
                            <span>{result.source}</span>
                            <span>•</span>
                            <span className="text-primary-400">{result.url}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => openUrl(result.url)}
                          className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-dark-400 hover:text-white ml-3"
                          title="Open link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isSearching && searchResults.length === 0 && (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 mx-auto mb-4 text-dark-400 opacity-50" />
                  <p className="text-dark-300">No search results found</p>
                  <p className="text-sm text-dark-400 mt-2">Try adjusting your search terms</p>
                </div>
              )}

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-dark-600">
                <p className="text-xs text-dark-400 text-center">
                  Web search results are provided by our AI search engine. 
                  Click on any result to open the source in a new tab.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
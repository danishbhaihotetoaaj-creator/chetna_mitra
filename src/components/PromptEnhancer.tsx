'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, X, Send, RotateCcw } from 'lucide-react'
import { useChat } from '@/contexts/ChatContext'
import toast from 'react-hot-toast'

interface PromptEnhancerProps {
  onClose: () => void
}

interface EnhancementOption {
  id: string
  label: string
  description: string
  icon: string
  prompt: string
}

const enhancementOptions: EnhancementOption[] = [
  {
    id: 'clearer',
    label: 'Make Clearer',
    description: 'Simplify and clarify your message',
    icon: '✨',
    prompt: 'Please make this clearer and easier to understand: '
  },
  {
    id: 'detailed',
    label: 'Add Detail',
    description: 'Expand with more context and examples',
    icon: '📝',
    prompt: 'Please add more detail and context to this: '
  },
  {
    id: 'professional',
    label: 'Professional Tone',
    description: 'Make it more formal and business-like',
    icon: '💼',
    prompt: 'Please rewrite this in a professional tone: '
  },
  {
    id: 'casual',
    label: 'Casual Tone',
    description: 'Make it more friendly and informal',
    icon: '😊',
    prompt: 'Please rewrite this in a casual, friendly tone: '
  },
  {
    id: 'concise',
    label: 'Make Concise',
    description: 'Shorten while keeping key information',
    icon: '✂️',
    prompt: 'Please make this more concise: '
  },
  {
    id: 'creative',
    label: 'Creative Writing',
    description: 'Add creativity and imagination',
    icon: '🎨',
    prompt: 'Please rewrite this with more creativity and imagination: '
  }
]

export function PromptEnhancer({ onClose }: PromptEnhancerProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const [isEnhancing, setIsEnhancing] = useState(false)
  const { addMessage } = useChat()

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  const enhancePrompt = async () => {
    if (selectedOptions.length === 0) {
      toast.error('Please select at least one enhancement option')
      return
    }

    setIsEnhancing(true)

    try {
      // Simulate AI enhancement
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const selectedEnhancements = enhancementOptions.filter(opt => 
        selectedOptions.includes(opt.id)
      )
      
      let enhanced = 'Enhanced prompt:\n\n'
      selectedEnhancements.forEach((enhancement, index) => {
        enhanced += `${index + 1}. ${enhancement.label}:\n`
        enhanced += `${enhancement.prompt}[Your original message here]\n\n`
      })
      
      enhanced += 'Choose the enhancement style that best fits your needs and apply it to your message before sending.'
      
      setEnhancedPrompt(enhanced)
      toast.success('Prompt enhanced successfully!')
    } catch (error) {
      toast.error('Failed to enhance prompt')
    } finally {
      setIsEnhancing(false)
    }
  }

  const resetEnhancement = () => {
    setSelectedOptions([])
    setEnhancedPrompt('')
  }

  const applyEnhancement = () => {
    if (enhancedPrompt) {
      addMessage(enhancedPrompt, 'text')
      onClose()
      toast.success('Enhanced prompt applied!')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-dark-800 border border-dark-600 rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-accent-400" />
          <h3 className="text-lg font-semibold">Prompt Enhancer</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Enhancement Options */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-3">Choose Enhancement Style(s)</h4>
        <div className="grid grid-cols-2 gap-3">
          {enhancementOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className={`p-3 rounded-lg border transition-all text-left ${
                selectedOptions.includes(option.id)
                  ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                  : 'border-dark-600 hover:border-dark-500 hover:bg-dark-700'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
              <p className="text-xs text-dark-400">{option.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mb-4">
        <button
          onClick={enhancePrompt}
          disabled={selectedOptions.length === 0 || isEnhancing}
          className="flex-1 px-4 py-2 bg-accent-600 hover:bg-accent-700 disabled:bg-dark-700 disabled:text-dark-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isEnhancing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Enhancing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Enhance Prompt</span>
            </>
          )}
        </button>
        
        <button
          onClick={resetEnhancement}
          className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Enhanced Prompt Display */}
      {enhancedPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h4 className="text-sm font-medium mb-2">Enhanced Prompt</h4>
          <div className="p-3 bg-dark-900 border border-dark-600 rounded-lg max-h-48 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap font-sans">{enhancedPrompt}</pre>
          </div>
          
          <div className="flex space-x-3 mt-3">
            <button
              onClick={applyEnhancement}
              className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Apply Enhancement</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Tips */}
      <div className="p-3 bg-dark-900 rounded-lg">
        <p className="text-xs text-dark-400">
          💡 <strong>Tip:</strong> Select one or more enhancement styles to improve your prompts. 
          The AI will suggest how to modify your message for better results.
        </p>
      </div>
    </motion.div>
  )
}
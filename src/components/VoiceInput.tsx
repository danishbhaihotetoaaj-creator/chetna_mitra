'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mic, MicOff, Volume2, VolumeX, X, RotateCcw } from 'lucide-react'
import { useChat } from '@/contexts/ChatContext'
import toast from 'react-hot-toast'

interface VoiceInputProps {
  onClose: () => void
}

export function VoiceInput({ onClose }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)
  const { addMessage } = useChat()
  const transcriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = 'en-US'
      
      recognitionInstance.onstart = () => {
        setIsListening(true)
        toast.success('Voice recognition started')
      }
      
      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = ''
        let interimTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }
        
        setTranscript(finalTranscript + interimTranscript)
      }
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        
        switch (event.error) {
          case 'no-speech':
            toast.error('No speech detected. Please try again.')
            break
          case 'audio-capture':
            toast.error('Microphone access denied. Please check permissions.')
            break
          case 'not-allowed':
            toast.error('Microphone access denied. Please allow microphone access.')
            break
          default:
            toast.error('Voice recognition error. Please try again.')
        }
      }
      
      recognitionInstance.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(recognitionInstance)
    } else {
      toast.error('Speech recognition not supported in this browser')
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis)
    }
  }, [])

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [transcript])

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start()
      } catch (error) {
        console.error('Error starting recognition:', error)
        toast.error('Failed to start voice recognition')
      }
    }
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
    }
  }

  const clearTranscript = () => {
    setTranscript('')
  }

  const sendTranscript = () => {
    if (transcript.trim()) {
      addMessage(transcript.trim(), 'text')
      setTranscript('')
      onClose()
      toast.success('Voice message sent!')
    }
  }

  const speakText = (text: string) => {
    if (speechSynthesis && text) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => {
        setIsSpeaking(false)
        toast.error('Speech synthesis error')
      }
      
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleMicClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
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
        <h3 className="text-lg font-semibold">Voice Input</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Voice Controls */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={handleMicClick}
          className={`p-4 rounded-full transition-all ${
            isListening
              ? 'bg-red-600 text-white scale-110 animate-pulse'
              : 'bg-primary-600 hover:bg-primary-700 text-white hover:scale-105'
          }`}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <button
          onClick={isSpeaking ? stopSpeaking : () => speakText(transcript)}
          disabled={!transcript}
          className={`p-4 rounded-full transition-all ${
            isSpeaking
              ? 'bg-red-600 text-white'
              : 'bg-accent-600 hover:bg-accent-700 text-white'
          } disabled:bg-dark-700 disabled:text-dark-400 disabled:cursor-not-allowed`}
        >
          {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>

      {/* Status */}
      <div className="text-center mb-4">
        <p className="text-sm text-dark-300">
          {isListening ? 'Listening... Speak now!' : 'Click the microphone to start'}
        </p>
        {isListening && (
          <div className="flex justify-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
      </div>

      {/* Transcript */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Transcript</label>
          <button
            onClick={clearTranscript}
            className="p-1 hover:bg-dark-700 rounded transition-colors"
            title="Clear transcript"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        
        <div
          ref={transcriptRef}
          className="h-32 p-3 bg-dark-900 border border-dark-600 rounded-lg overflow-y-auto text-sm"
        >
          {transcript || (
            <span className="text-dark-400 italic">
              Your speech will appear here...
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={sendTranscript}
          disabled={!transcript.trim()}
          className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-dark-700 disabled:text-dark-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          Send Message
        </button>
      </div>

      {/* Tips */}
      <div className="mt-4 p-3 bg-dark-900 rounded-lg">
        <p className="text-xs text-dark-400">
          💡 <strong>Tips:</strong> Speak clearly, pause between sentences, and ensure your microphone has proper permissions.
        </p>
      </div>
    </motion.div>
  )
}
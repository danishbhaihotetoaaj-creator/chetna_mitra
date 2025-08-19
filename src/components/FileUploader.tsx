'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Image, FileAudio, FileText, File, Check } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { useChat } from '@/contexts/ChatContext'
import toast from 'react-hot-toast'

interface FileUploaderProps {
  onClose: () => void
}

interface UploadedFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'audio' | 'file'
  size: string
}

export function FileUploader({ onClose }: FileUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { addMessage } = useChat()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => {
      const type = file.type.startsWith('image/') ? 'image' 
        : file.type.startsWith('audio/') ? 'audio' 
        : 'file'
      
      const preview = type === 'image' ? URL.createObjectURL(file) : ''
      const size = formatFileSize(file.size)
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview,
        type,
        size
      }
    })
    
    setUploadedFiles(prev => [...prev, ...newFiles])
    toast.success(`${acceptedFiles.length} file(s) added`)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.md', '.json'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true
  })

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === id)
      if (file && file.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6" />
      case 'audio':
        return <FileAudio className="w-6 h-6" />
      case 'file':
        return <FileText className="w-6 h-6" />
      default:
        return <File className="w-6 h-6" />
    }
  }

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return

    setIsUploading(true)
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Add each file as a message
      for (const uploadedFile of uploadedFiles) {
        const metadata = {
          fileName: uploadedFile.file.name,
          fileSize: uploadedFile.size,
          fileType: uploadedFile.file.type,
          url: uploadedFile.preview || URL.createObjectURL(uploadedFile.file)
        }
        
        addMessage(
          `Uploaded: ${uploadedFile.file.name}`,
          uploadedFile.type,
          metadata
        )
      }
      
      // Clean up previews
      uploadedFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
      
      setUploadedFiles([])
      onClose()
      toast.success('Files uploaded successfully!')
    } catch (error) {
      toast.error('Failed to upload files')
    } finally {
      setIsUploading(false)
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
        <h3 className="text-lg font-semibold">Upload Files</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          isDragActive
            ? 'border-primary-500 bg-primary-500/10'
            : 'border-dark-600 hover:border-dark-500 hover:bg-dark-700/50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-dark-400" />
        <p className="text-lg font-medium mb-2">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-dark-400 mb-4">
          or click to select files
        </p>
        <div className="text-xs text-dark-500 space-y-1">
          <p>Supported: Images, Audio, PDF, Text files</p>
          <p>Max size: 10MB per file</p>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">Selected Files ({uploadedFiles.length})</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3 p-3 bg-dark-900 rounded-lg border border-dark-600"
              >
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                  {getFileIcon(file.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.file.name}</p>
                  <p className="text-xs text-dark-400">{file.size}</p>
                </div>
                
                {file.preview && file.type === 'image' && (
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
                
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-dark-700 rounded transition-colors text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3 mt-4">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          disabled={uploadedFiles.length === 0 || isUploading}
          className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-dark-700 disabled:text-dark-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Upload Files</span>
            </>
          )}
        </button>
      </div>

      {/* Tips */}
      <div className="mt-4 p-3 bg-dark-900 rounded-lg">
        <p className="text-xs text-dark-400">
          💡 <strong>Tips:</strong> You can upload multiple files at once. Images will be displayed inline, audio files will have playback controls.
        </p>
      </div>
    </motion.div>
  )
}
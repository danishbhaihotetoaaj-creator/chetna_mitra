import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import VoiceInput from '../../../components/ui/VoiceInput';
import FileUpload from '../../../components/ui/FileUpload';
import FilePreview from '../../../components/ui/FilePreview';
import Icon from '../../../components/AppIcon';

const ChatInput = ({ onSendMessage, isLoading = false, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const textareaRef = useRef(null);
  const maxChars = 1000;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setMessage(value);
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((message.trim() || attachedFiles.length > 0) && !isLoading && !disabled) {
      const messageData = {
        text: message.trim(),
        files: attachedFiles
      };
      onSendMessage(messageData);
      setMessage('');
      setCharCount(0);
      setAttachedFiles([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceResult = (transcript) => {
    setMessage(prev => prev + (prev ? ' ' : '') + transcript);
    setCharCount(prev => Math.min(prev + transcript.length + (message ? 1 : 0), maxChars));
  };

  const handleFileSelect = (files) => {
    setAttachedFiles(prev => [...prev, ...files].slice(0, 5)); // Max 5 files
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const isMessageValid = message.trim().length > 0 || attachedFiles.length > 0;

  return (
    <div className="border-t border-border bg-gradient-to-r from-card/80 to-card backdrop-blur-sm">
      <div className="p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* File Preview */}
          {attachedFiles.length > 0 && (
            <div className="mb-3">
              <FilePreview files={attachedFiles} onRemoveFile={handleRemoveFile} />
            </div>
          )}

          {/* Input Area */}
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                  disabled={disabled || isLoading}
                  className="w-full min-h-[44px] max-h-[120px] px-4 py-3 pr-16 border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-input text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                  rows={1}
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  {charCount}/{maxChars}
                </div>
              </div>
              {charCount > maxChars * 0.9 && (
                <div className="mt-1 text-xs text-warning flex items-center space-x-1">
                  <Icon name="AlertTriangle" size={12} />
                  <span>{maxChars - charCount} characters remaining</span>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <FileUpload
                onFileSelect={handleFileSelect}
                disabled={disabled || isLoading}
              />
              
              <VoiceInput
                onVoiceResult={handleVoiceResult}
                isListening={isListening}
                onStartListening={() => setIsListening(true)}
                onStopListening={() => setIsListening(false)}
                disabled={disabled || isLoading}
              />
              
              <Button
                type="submit"
                variant="default"
                size="default"
                disabled={!isMessageValid || isLoading || disabled}
                loading={isLoading}
                iconName="Send"
                iconPosition="right"
                iconSize={16}
                className="flex-shrink-0 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-200"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Icon name="Zap" size={12} className="text-accent" />
                <span>AI-powered responses</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Mic" size={12} className="text-success" />
                <span>Voice input enabled</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Paperclip" size={12} className="text-warning" />
                <span>File attachments ({attachedFiles.length}/5)</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Shield" size={12} className="text-muted-foreground" />
                <span>Privacy protected</span>
              </span>
            </div>
            <div className="hidden sm:block">
              Press Enter to send • Shift+Enter for new line
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
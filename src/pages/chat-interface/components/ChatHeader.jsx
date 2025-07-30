import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatHeader = ({ onClearChat, messageCount = 0, isOnline = true }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history? This action cannot be undone.')) {
      onClearChat();
    }
    setShowOptions(false);
  };

  return (
    <div className="sticky top-16 z-40 bg-gradient-to-r from-card/95 to-card/90 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Chat Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent via-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <Icon name="Bot" size={20} className="text-white" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                  isOnline ? 'bg-success' : 'bg-muted-foreground'
                }`}></div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Chetna Mitra
                </h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className={`flex items-center space-x-1 ${isOnline ? 'text-success' : 'text-muted-foreground'}`}>
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
                    <span>{isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                  {messageCount > 0 && (
                    <>
                      <span>•</span>
                      <span>{messageCount} message{messageCount !== 1 ? 's' : ''}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2 text-xs text-muted-foreground bg-muted/30 rounded-full px-3 py-1">
              <Icon name="Sparkles" size={12} className="text-accent" />
              <span>AI-Powered Chat</span>
            </div>

            {/* Options Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowOptions(!showOptions)}
                className="hover:bg-accent/10"
                title="Chat options"
              >
                <Icon name="MoreVertical" size={18} />
              </Button>

              {showOptions && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowOptions(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-20 animate-in slide-in">
                    <div className="p-1">
                      <button
                        onClick={handleClearChat}
                        disabled={messageCount === 0}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Icon name="Trash2" size={16} />
                        <span>Clear Chat</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          // Export chat functionality can be added here
                          setShowOptions(false);
                        }}
                        disabled={messageCount === 0}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Icon name="Download" size={16} />
                        <span>Export Chat</span>
                      </button>

                      <div className="border-t border-border my-1"></div>
                      
                      <div className="px-3 py-2">
                        <div className="text-xs text-muted-foreground">Features</div>
                        <div className="mt-1 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Voice Input</span>
                            <Icon name="Mic" size={12} className="text-success" />
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span>Voice Output</span>
                            <Icon name="Volume2" size={12} className="text-success" />
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span>File Upload</span>
                            <Icon name="Paperclip" size={12} className="text-success" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
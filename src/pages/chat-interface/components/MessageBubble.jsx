import React from 'react';
import VoiceOutput from '../../../components/ui/VoiceOutput';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ 
  message, 
  isUser = false, 
  timestamp, 
  isLoading = false,
  files = []
}) => {
  if (isLoading) {
    return (
      <div className="flex items-start space-x-3 animate-in slide-in">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <Icon name="Bot" size={16} className="text-white" />
          </div>
        </div>
        <div className="flex-1 max-w-3xl">
          <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl rounded-tl-md p-4 shadow-sm border border-border/50">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-sm text-muted-foreground">AI is thinking...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderFiles = (files) => {
    if (!files || files.length === 0) return null;

    return (
      <div className="mt-3 space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center space-x-2 p-2 bg-muted/20 rounded-lg border border-border/30">
            <Icon name={file.type.startsWith('image/') ? 'Image' : 'File'} size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground truncate">{file.name}</span>
            <span className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(1)} KB
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`flex items-start space-x-3 animate-in slide-in ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-br from-primary to-primary/80 shadow-md' 
            : 'bg-gradient-to-br from-accent to-primary'
        }`}>
          <Icon name={isUser ? "User" : "Bot"} size={16} className="text-white" />
        </div>
      </div>
      
      <div className="flex-1 max-w-3xl">
        <div className={`rounded-2xl p-4 shadow-sm border transition-all duration-200 hover:shadow-md ${
          isUser 
            ? 'bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 rounded-tr-md ml-auto' :'bg-gradient-to-r from-card to-card/90 border-border/50 rounded-tl-md backdrop-blur-sm'
        }`}>
          {/* Files */}
          {renderFiles(files)}
          
          {/* Message Text */}
          {message && (
            <div className={`text-sm leading-relaxed ${
              isUser ? 'text-foreground' : 'text-foreground'
            }`}>
              {message.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < message.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          )}
          
          {/* Footer */}
          <div className={`flex items-center justify-between mt-3 ${
            isUser ? 'flex-row-reverse' : ''
          }`}>
            <div className="flex items-center space-x-2">
              {timestamp && (
                <span className="text-xs text-muted-foreground">
                  {formatTime(timestamp)}
                </span>
              )}
              {!isUser && message && (
                <VoiceOutput text={message} />
              )}
            </div>
            
            {!isUser && (
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 text-muted-foreground hover:text-foreground transition-colors" title="Copy message">
                  <Icon name="Copy" size={12} />
                </button>
                <button className="p-1 text-muted-foreground hover:text-foreground transition-colors" title="Like message">
                  <Icon name="ThumbsUp" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorMessage = ({ message, onRetry, onDismiss }) => {
  return (
    <div className="flex items-start space-x-3 mb-4">
      <div className="w-8 h-8 bg-error rounded-full flex items-center justify-center flex-shrink-0">
        <Icon name="AlertCircle" size={16} color="white" />
      </div>
      
      <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
        <div className="bg-error/10 border border-error/20 rounded-lg p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
              <span className="text-sm font-medium text-error">
                Message Failed
              </span>
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-error hover:text-error/80 transition-colors duration-200"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
          
          <p className="text-sm text-foreground mb-3">
            {message || "Sorry, I couldn't process your message. Please try again."}
          </p>
          
          <div className="flex items-center space-x-2">
            {onRetry && (
              <Button
                variant="outline"
                size="xs"
                onClick={onRetry}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={12}
              >
                Retry
              </Button>
            )}
            <Button
              variant="ghost"
              size="xs"
              onClick={onDismiss}
              className="text-muted-foreground hover:text-foreground"
            >
              Dismiss
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mt-1">
          {new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
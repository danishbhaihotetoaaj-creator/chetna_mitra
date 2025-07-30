import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const VoiceInput = ({ onVoiceResult, isListening, onStartListening, onStopListening, disabled = false }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
        
        if (finalTranscript && onVoiceResult) {
          onVoiceResult(finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        onStopListening?.();
      };

      recognition.onend = () => {
        onStopListening?.();
        setTranscript('');
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onVoiceResult, onStopListening]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      recognitionRef.current.start();
      onStartListening?.();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  if (!isSupported) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="opacity-50"
        title="Voice input not supported in this browser"
      >
        <Icon name="MicOff" size={20} />
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant={isListening ? "destructive" : "ghost"}
        size="icon"
        onClick={isListening ? stopListening : startListening}
        disabled={disabled}
        className={`transition-all duration-200 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-200' 
            : 'hover:bg-accent hover:text-accent-foreground'
        }`}
        title={isListening ? 'Stop recording' : 'Start voice input'}
      >
        <Icon name={isListening ? "Square" : "Mic"} size={20} />
      </Button>
      
      {isListening && transcript && (
        <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded-lg p-3 shadow-lg max-w-sm">
          <div className="text-xs text-muted-foreground mb-1">Listening...</div>
          <div className="text-sm text-foreground">{transcript}</div>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const VoiceOutput = ({ text, disabled = false, speechSynthesis }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);

  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = () => {
    if (!text || !isSupported || isPlaying) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  if (!isSupported || !text) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="xs"
      onClick={isPlaying ? stop : speak}
      disabled={disabled}
      className={`transition-all duration-200 ${
      isPlaying ?
      'text-primary animate-pulse' : 'text-muted-foreground hover:text-foreground'}`
      }
      title={isPlaying ? 'Stop speaking' : 'Read aloud'}>

      <Icon name={isPlaying ? "VolumeX" : "Volume2"} size={14} />
      <span className="ml-1 text-xs">
        {isPlaying ? 'Stop' : 'Listen'}
      </span>
    </Button>);

};

export default VoiceOutput;
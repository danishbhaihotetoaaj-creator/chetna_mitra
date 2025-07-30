import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';
import WelcomeMessage from './components/WelcomeMessage';
import ErrorMessage from './components/ErrorMessage';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Enhanced mock AI responses for demonstration
  const mockAIResponses = [
    "Hello! I'm Chetna Mitra, your advanced AI assistant. I can help with questions, analyze documents, and even respond to voice input. How can I assist you today?",
    "That's a great question! Let me help you with that. I can process text, images, and documents to provide you with comprehensive information and guidance.",
    "I understand your concern. Here are some suggestions that might help you resolve this issue effectively. I can also read this response aloud if you'd like!",
    "Thank you for sharing that with me. I notice you've attached some files - I can help analyze documents, images, and provide insights based on the content.",
    "I'd be happy to help you with that! Let me break this down into simple steps. You can also use voice input to ask follow-up questions if that's more convenient.",
    "That's an interesting point. From my knowledge base, I can tell you that this is a common question. I can provide both text and voice responses to help you better understand.",
    "I appreciate your patience. Let me provide you with a comprehensive answer. Feel free to use the voice output feature to listen to my response.",
    "Based on your query and any files you've shared, I can offer several approaches to help you achieve your goal. Which one would you prefer to explore first?"
  ];

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chetna-chat-history');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chetna-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const processFiles = (files) => {
    // Process different file types
    const fileInfo = files.map(file => {
      let description = '';
      if (file.type.startsWith('image/')) {
        description = 'I can see you\'ve shared an image. While I can\'t analyze the visual content directly in this demo, in a full implementation, I could describe what I see and answer questions about it.';
      } else if (file.type === 'application/pdf') {
        description = 'You\'ve shared a PDF document. In a full implementation, I could extract and analyze the text content to answer questions about the document.';
      } else if (file.type.includes('document') || file.type.includes('word')) {
        description = 'I can see you\'ve uploaded a document. With full integration, I could read and analyze the content to help you with questions or summaries.';
      } else {
        description = 'You\'ve shared a file. With proper backend integration, I could process various file types and provide insights.';
      }
      return { file, description };
    });

    return fileInfo;
  };

  const simulateAIResponse = async (messageData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simulate occasional errors (3% chance)
    if (Math.random() < 0.03) {
      throw new Error('Network error occurred. Please try again.');
    }

    const { text: userMessage, files = [] } = messageData;
    let response;
    
    // Process files if present
    if (files.length > 0) {
      const fileProcessing = processFiles(files);
      const fileDescriptions = fileProcessing.map(fp => fp.description).join('\n\n');
      response = `${fileDescriptions}\n\n`;
      
      if (userMessage) {
        response += `Regarding your message: "${userMessage}" - I'd be happy to help with that as well!`;
      } else {
        response += "Feel free to ask me any questions about the files you've shared!";
      }
    } else if (userMessage) {
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        response = "Hello! I'm Chetna Mitra, your advanced AI assistant with voice and file processing capabilities. How can I help you today?";
      } else if (lowerMessage.includes('voice') || lowerMessage.includes('speak')) {
        response = "Great! I support both voice input and output. You can speak to me using the microphone button, and I can read my responses aloud using the voice output feature. Try it out!";
      } else if (lowerMessage.includes('file') || lowerMessage.includes('document') || lowerMessage.includes('image')) {
        response = "I can process various file types including images, PDFs, and documents! Just click the paperclip icon to upload files, or drag and drop them into the chat. I'll analyze them and answer your questions.";
      } else if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
        response = "I'd be happy to help you! I have several advanced capabilities:\n\n• Voice input and output for hands-free interaction\n• Document and image processing\n• Intelligent conversation and Q&A\n• Modern, responsive interface\n\nWhat would you like to explore?";
      } else if (lowerMessage.includes('features') || lowerMessage.includes('capabilities')) {
        response = "Here are my enhanced capabilities:\n\n🎤 **Voice Input**: Speak naturally using the microphone\n🔊 **Voice Output**: Listen to my responses\n📎 **File Processing**: Upload images, PDFs, documents\n🤖 **AI Chat**: Intelligent conversation and assistance\n🎨 **Modern UI**: Beautiful, responsive design\n\nTry any of these features - I'm here to help!";
      } else {
        // Random enhanced response
        response = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
      }
    } else {
      response = "I notice you didn't include any text with your files. Feel free to ask me questions about what you've shared!";
    }

    return response;
  };

  const handleSendMessage = async (messageData) => {
    const { text, files = [] } = messageData;
    
    if (!text?.trim() && files.length === 0) return;
    if (isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: text || '',
      files: files,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await simulateAIResponse(messageData);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError({
        id: Date.now() + 1,
        message: error.message,
        originalMessage: messageData,
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickStart = (message) => {
    handleSendMessage({ text: message, files: [] });
  };

  const handleClearChat = () => {
    setMessages([]);
    setError(null);
    localStorage.removeItem('chetna-chat-history');
  };

  const handleRetryMessage = () => {
    if (error && error.originalMessage) {
      setError(null);
      handleSendMessage(error.originalMessage);
    }
  };

  const handleDismissError = () => {
    setError(null);
  };

  const showWelcome = messages.length === 0 && !isLoading && !error;

  return (
    <>
      <Helmet>
        <title>Chat Interface - Chetna Mitra AI Assistant</title>
        <meta name="description" content="Advanced AI chat interface with voice input/output, file processing, and modern design. Chat with Chetna Mitra for intelligent assistance and document analysis." />
        <meta name="keywords" content="AI chat, voice input, voice output, file processing, document analysis, chatbot, assistant, conversation" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Header />
        
        <div className="pt-16 h-screen flex flex-col">
          <ChatHeader 
            onClearChat={handleClearChat}
            messageCount={messages.length}
            isOnline={isOnline}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            {showWelcome ? (
              <WelcomeMessage onQuickStart={handleQuickStart} />
            ) : (
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-transparent to-muted/10"
              >
                <div className="max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                      files={message.files}
                    />
                  ))}
                  
                  {isLoading && (
                    <MessageBubble isLoading={true} />
                  )}
                  
                  {error && (
                    <ErrorMessage
                      message={error.message}
                      onRetry={handleRetryMessage}
                      onDismiss={handleDismissError}
                    />
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
            
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              disabled={!isOnline}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
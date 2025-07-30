import React from 'react';

import Icon from '../../../components/AppIcon';

const WelcomeMessage = ({ onQuickStart }) => {
  const quickStartOptions = [
    {
      title: "Try Voice Input",
      description: "Use the microphone to speak your message",
      icon: "Mic",
      message: "Hello! I\'d like to try voice input.",
      gradient: "from-accent to-primary"
    },
    {
      title: "Upload a Document", 
      description: "Share files for analysis and discussion",
      icon: "FileText",
      message: "Can you help me analyze a document?",
      gradient: "from-success to-accent"
    },
    {
      title: "General Questions",
      description: "Ask me anything you\'d like to know",
      icon: "MessageCircle",
      message: "What are your capabilities and features?",
      gradient: "from-warning to-success"
    },
    {
      title: "Voice Output Demo",
      description: "Listen to AI responses with text-to-speech",
      icon: "Volume2",
      message: "Please explain your voice features and read your response aloud.",
      gradient: "from-primary to-accent"
    }
  ];

  const features = [
    { icon: "Mic", label: "Voice Input", description: "Speak naturally" },
    { icon: "Volume2", label: "Voice Output", description: "Listen to responses" },
    { icon: "Paperclip", label: "File Upload", description: "Images & documents" },
    { icon: "Sparkles", label: "AI Powered", description: "Intelligent assistance" }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent via-primary to-primary/80 flex items-center justify-center shadow-2xl shadow-primary/20">
              <Icon name="Bot" size={40} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full border-4 border-background animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Welcome to Chetna Mitra
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your advanced AI assistant with voice interaction, document processing, and intelligent conversation capabilities
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-4 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Icon name={feature.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{feature.label}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Start Options */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {quickStartOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => onQuickStart(option.message)}
                className="group p-6 text-left bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:border-primary/20"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon name={option.icon} size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                  <Icon name="ArrowRight" size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-muted/30 to-muted/20 backdrop-blur-sm border border-border/30 rounded-xl p-6 max-w-3xl mx-auto">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={24} className="text-warning flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Pro Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Click the microphone button to use voice input for hands-free messaging</li>
                <li>• Use the paperclip icon to upload documents, images, or other files for analysis</li>
                <li>• Enable voice output to listen to AI responses - perfect for multitasking</li>
                <li>• Drag and drop files directly into the chat for quick sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
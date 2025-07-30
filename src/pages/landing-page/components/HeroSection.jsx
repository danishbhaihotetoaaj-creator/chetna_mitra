import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background min-h-screen flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Icon name="Sparkles" size={16} className="mr-2" />
            AI-Powered Assistant
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Meet Your Intelligent
            <span className="text-primary block">Conversation Partner</span>
          </h1>

          {/* Value Proposition */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the future of AI assistance with Chetna Mitra. Get instant answers, personalized support, and intelligent conversations that understand your needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/chat-interface">
              <Button 
                variant="default" 
                size="lg" 
                iconName="MessageCircle" 
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Start Chatting Now
              </Button>
            </Link>
            <Link to="/about-page">
              <Button 
                variant="outline" 
                size="lg" 
                iconName="Info" 
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Icon name="Shield" size={16} className="mr-2 text-success" />
              Privacy Protected
            </div>
            <div className="flex items-center">
              <Icon name="Zap" size={16} className="mr-2 text-warning" />
              Instant Responses
            </div>
            <div className="flex items-center">
              <Icon name="Users" size={16} className="mr-2 text-accent" />
              Trusted by Thousands
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
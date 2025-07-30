import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TechnologySection = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const features = [
    {
      icon: "Brain",
      title: "Advanced Natural Language Processing",
      shortDesc: "Understands context, nuance, and intent in human conversation",
      fullDesc: `Our AI uses state-of-the-art transformer architecture to process and understand natural language with remarkable accuracy. It can maintain context across long conversations, understand implied meanings, and respond appropriately to complex queries.\n\nThe system is trained on diverse datasets to ensure cultural sensitivity and broad knowledge coverage while maintaining safety and ethical guidelines.`
    },
    {
      icon: "Shield",
      title: "Privacy-First Architecture",
      shortDesc: "Built with privacy and security as fundamental design principles",
      fullDesc: `Every conversation is processed with end-to-end encryption and zero-knowledge architecture. We don't store personal conversations beyond the active session, and all data processing follows strict privacy protocols.\n\nOur infrastructure is designed to minimize data collection while maximizing functionality, ensuring your privacy is never compromised for performance.`
    },
    {
      icon: "Zap",
      title: "Real-Time Response System",
      shortDesc: "Lightning-fast responses without compromising quality or accuracy",
      fullDesc: `Our optimized inference pipeline delivers responses in milliseconds while maintaining high quality. The system uses intelligent caching and prediction algorithms to anticipate user needs.\n\nAdvanced load balancing ensures consistent performance even during peak usage, providing a smooth conversational experience at all times.`
    },
    {
      icon: "Target",
      title: "Contextual Understanding",
      shortDesc: "Maintains conversation context and provides relevant, personalized responses",
      fullDesc: `The AI maintains conversation history and context throughout your session, allowing for natural, flowing conversations. It can reference previous topics, understand follow-up questions, and provide increasingly relevant responses.\n\nPersonalization happens in real-time without storing personal data, adapting to your communication style and preferences during the conversation.`
    }
  ];

  const toggleExpanded = (index) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Technology Behind Chetna Mitra
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our AI is built on cutting-edge technology designed for safety, reliability, and human-centered interaction. Here's how we make conversations meaningful and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon} size={24} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.shortDesc}
                  </p>
                  
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                  >
                    <span>{expandedFeature === index ? 'Show Less' : 'Learn More'}</span>
                    <Icon 
                      name={expandedFeature === index ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                    />
                  </button>
                  
                  {expandedFeature === index && (
                    <div className="mt-4 pt-4 border-t border-border progressive-disclosure">
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {feature.fullDesc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
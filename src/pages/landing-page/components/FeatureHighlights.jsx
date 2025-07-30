import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      id: 1,
      icon: 'Brain',
      title: 'Advanced AI Intelligence',
      description: 'Powered by cutting-edge natural language processing to understand context and provide meaningful responses.',
      color: 'text-primary'
    },
    {
      id: 2,
      icon: 'Clock',
      title: 'Instant Responses',
      description: 'Get immediate answers to your questions without waiting. Our AI processes and responds in real-time.',
      color: 'text-accent'
    },
    {
      id: 3,
      icon: 'Shield',
      title: 'Privacy First',
      description: 'Your conversations are secure and private. We prioritize data protection and user confidentiality.',
      color: 'text-success'
    },
    {
      id: 4,
      icon: 'Lightbulb',
      title: 'Smart Suggestions',
      description: 'Receive intelligent recommendations and insights tailored to your specific needs and preferences.',
      color: 'text-warning'
    },
    {
      id: 5,
      icon: 'Globe',
      title: '24/7 Availability',
      description: 'Access your AI assistant anytime, anywhere. Available round the clock for your convenience.',
      color: 'text-accent'
    },
    {
      id: 6,
      icon: 'Heart',
      title: 'Personalized Experience',
      description: 'Adaptive learning ensures conversations become more relevant and helpful over time.',
      color: 'text-error'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose Chetna Mitra?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the powerful features that make our AI assistant the perfect companion for all your conversational needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 floating-action"
            >
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 ${feature.color}`}>
                <Icon name={feature.icon} size={24} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
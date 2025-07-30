import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToActionSection = () => {
  const actions = [
    {
      title: "Start Your First Conversation",
      description: "Experience the power of ethical AI conversation technology",
      buttonText: "Try Chetna Mitra",
      buttonVariant: "default",
      icon: "MessageCircle",
      link: "/chat-interface"
    },
    {
      title: "Share Your Feedback",
      description: "Help us improve by sharing your thoughts and suggestions",
      buttonText: "Give Feedback",
      buttonVariant: "outline",
      icon: "MessageSquare",
      link: "/feedback-page"
    },
    {
      title: "Learn About Privacy",
      description: "Understand how we protect your data and conversations",
      buttonText: "Privacy Policy",
      buttonVariant: "outline",
      icon: "Shield",
      link: "/privacy-policy"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who trust Chetna Mitra for intelligent, private, and meaningful AI conversations. Your journey with ethical AI starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {actions.map((action, index) => (
            <div key={index} className="bg-card rounded-2xl p-8 shadow-sm border border-border text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Icon name={action.icon} size={32} color="var(--color-primary)" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {action.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {action.description}
              </p>
              <Link to={action.link}>
                <Button 
                  variant={action.buttonVariant} 
                  size="lg" 
                  fullWidth
                  iconName={action.icon}
                  iconPosition="left"
                >
                  {action.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                  <Icon name="Bot" size={40} color="white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Questions About Our Technology?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our team is here to help. Reach out with any questions about our AI technology, privacy practices, or partnership opportunities.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a 
                  href="mailto:hello@chetnamitra.ai"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  <Icon name="Mail" size={18} className="mr-2" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
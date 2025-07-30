import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Future of AI Assistance?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the power of intelligent conversations with Chetna Mitra.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/chat-interface">
              <Button 
                variant="secondary" 
                size="lg" 
                iconName="MessageCircle" 
                iconPosition="left"
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90"
              >
                Start Your First Chat
              </Button>
            </Link>
            <Link to="/about-page">
              <Button 
                variant="outline" 
                size="lg" 
                iconName="ArrowRight" 
                iconPosition="right"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            <div>
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm opacity-90">Happy Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm opacity-90">Conversations</div>
            </div>
            <div>
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-sm opacity-90">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-90">Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
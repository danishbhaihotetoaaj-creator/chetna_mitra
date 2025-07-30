import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessMessage = ({ onSubmitAnother }) => {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-success/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <Icon name="CheckCircle" size={40} className="text-success" />
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Thank You for Your Feedback!
      </h2>
      
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Your feedback has been successfully submitted. We appreciate you taking the time to help us improve Chetna Mitra.
      </p>

      <div className="bg-card rounded-lg p-6 border border-border mb-8">
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>Response within 2-3 business days</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} />
            <span>Email confirmation sent</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          variant="default"
          onClick={onSubmitAnother}
          iconName="Plus"
          iconPosition="left"
        >
          Submit Another Feedback
        </Button>
        
        <Link to="/chat-interface">
          <Button variant="outline" iconName="MessageCircle" iconPosition="left">
            Continue Chatting
          </Button>
        </Link>
        
        <Link to="/landing-page">
          <Button variant="ghost" iconName="Home" iconPosition="left">
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <Icon name="Info" size={16} className="inline mr-1" />
          Your feedback reference ID: <span className="font-mono text-foreground">FB-{Date.now().toString().slice(-8)}</span>
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;
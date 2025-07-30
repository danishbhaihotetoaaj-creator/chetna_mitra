import React from 'react';
import Icon from '../../../components/AppIcon';


const ContactInfo = () => {
  const contactMethods = [
    {
      icon: 'Mail',
      title: 'Email',
      value: 'privacy@chetnamitra.com',
      description: 'For general privacy inquiries'
    },
    {
      icon: 'Shield',
      title: 'Data Protection Officer',
      value: 'dpo@chetnamitra.com',
      description: 'For data protection matters'
    },
    {
      icon: 'Phone',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Business hours: 9 AM - 6 PM EST'
    },
    {
      icon: 'MapPin',
      title: 'Address',
      value: `123 Privacy Street\nSuite 456\nSan Francisco, CA 94105\nUnited States`,
      description: 'Mailing address for formal requests'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="MessageCircle" size={20} className="text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Contact Us</h3>
      </div>
      <p className="text-muted-foreground mb-6">
        Have questions about our privacy practices? We're here to help. Choose the best way to reach us:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {contactMethods.map((method, index) => (
          <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={method.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">{method.title}</h4>
                <p className="text-sm text-foreground whitespace-pre-line mb-1">{method.value}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Clock" size={18} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Response Time</h4>
            <p className="text-sm text-muted-foreground">
              We typically respond to privacy inquiries within 2-3 business days. For urgent matters, please call our phone number during business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
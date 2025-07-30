import React from 'react';
import Icon from '../../../components/AppIcon';

const FeedbackTips = () => {
  const tips = [
    {
      icon: 'Lightbulb',
      title: 'Be Specific',
      description: 'Include details about what you were doing when the issue occurred or what feature you\'d like to see.'
    },
    {
      icon: 'Camera',
      title: 'Add Screenshots',
      description: 'Visual examples help us understand your feedback better and resolve issues faster.'
    },
    {
      icon: 'Clock',
      title: 'Response Time',
      description: 'We typically respond to feedback within 2-3 business days. Complex issues may take longer.'
    },
    {
      icon: 'Shield',
      title: 'Privacy First',
      description: 'Your feedback is confidential. We never share personal information with third parties.'
    }
  ];

  const faqs = [
    {
      question: 'How is my feedback used?',
      answer: 'We use feedback to improve Chetna Mitra\'s features, fix bugs, and enhance user experience. Your input directly influences our development priorities.'
    },
    {
      question: 'Will I get a response?',
      answer: 'If you provide your email and allow contact, we\'ll respond to acknowledge your feedback and provide updates when relevant.'
    },
    {
      question: 'Can I submit anonymous feedback?',
      answer: 'Yes! You can submit feedback without providing any contact information. However, we won\'t be able to follow up with you.'
    },
    {
      question: 'What about feature requests?',
      answer: 'We love feature requests! Please be as detailed as possible about what you\'d like to see and how it would help you.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Tips Section */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
          Feedback Tips
        </h3>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={tip.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{tip.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MessageCircleQuestion" size={20} className="mr-2 text-primary" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
              <h4 className="text-sm font-medium text-foreground mb-2">{faq.question}</h4>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Alternative */}
      <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
        <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2 text-primary" />
          Need Immediate Help?
        </h3>
        <p className="text-muted-foreground mb-4">
          For urgent issues or immediate assistance, you can also reach out through our chat interface.
        </p>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Average response time: 2-3 business days</span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTips;
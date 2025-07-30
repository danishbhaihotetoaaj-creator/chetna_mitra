import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do you use my chat data to improve the AI?",
      answer: `We analyze conversation patterns and user interactions to enhance our AI's understanding and response quality. All data is anonymized and aggregated before analysis.\n\nPersonal identifiers are removed, and we focus on improving general conversation flow rather than individual user behavior.`
    },
    {
      id: 2,
      question: "Can I delete my conversation history?",
      answer: `Yes, you can delete your conversation history at any time through your account settings. You can choose to delete individual conversations or your entire chat history.\n\nDeleted conversations are permanently removed from our servers within 30 days.`
    },
    {
      id: 3,
      question: "Do you share my data with third parties?",
      answer: `We do not sell or rent your personal data to third parties. We only share data with trusted service providers who help us operate our service, and only under strict confidentiality agreements.\n\nAny data sharing is limited to what's necessary for service operation and is governed by our privacy policy.`
    },
    {
      id: 4,
      question: "How long do you keep my data?",
      answer: `We retain your data only as long as necessary to provide our services. Chat history is kept for 2 years unless you delete it earlier.\n\nAccount information is retained until you close your account, after which it's deleted within 90 days.`
    },
    {
      id: 5,
      question: "Is my data encrypted?",
      answer: `Yes, all data is encrypted both in transit and at rest using industry-standard encryption protocols. We use TLS 1.3 for data transmission and AES-256 encryption for data storage.\n\nOur security measures are regularly audited by third-party security firms.`
    }
  ];

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="HelpCircle" size={20} className="text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h3>
      </div>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-4 py-3 text-left bg-muted/30 hover:bg-muted/50 transition-colors duration-200 flex items-center justify-between"
            >
              <span className="font-medium text-foreground">{faq.question}</span>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`text-muted-foreground transition-transform duration-200 ${
                  expandedFAQ === faq.id ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {expandedFAQ === faq.id && (
              <div className="px-4 py-3 bg-card">
                <p className="text-muted-foreground whitespace-pre-line">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
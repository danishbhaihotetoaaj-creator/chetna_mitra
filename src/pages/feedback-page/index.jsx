import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FeedbackForm from './components/FeedbackForm';
import FeedbackTips from './components/FeedbackTips';
import SuccessMessage from './components/SuccessMessage';
import Icon from '../../components/AppIcon';

const FeedbackPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleFeedbackSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful submission
      console.log('Feedback submitted:', formData);
      
      // Store submission timestamp
      localStorage.setItem('lastFeedbackSubmission', new Date().toISOString());
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error (show error message, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnother = () => {
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    {
      icon: 'MessageSquare',
      label: 'Feedback Received',
      value: '2,847',
      description: 'This month'
    },
    {
      icon: 'TrendingUp',
      label: 'Response Rate',
      value: '98.5%',
      description: 'Within 3 days'
    },
    {
      icon: 'Users',
      label: 'Happy Users',
      value: '15,230',
      description: 'And growing'
    },
    {
      icon: 'Star',
      label: 'Average Rating',
      value: '4.8/5',
      description: 'User satisfaction'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Feedback - Chetna Mitra | Share Your Experience</title>
        <meta name="description" content="Share your feedback and help us improve Chetna Mitra. Your input is valuable for enhancing our AI chatbot experience." />
        <meta name="keywords" content="feedback, suggestions, bug report, feature request, user experience, AI chatbot" />
        <meta property="og:title" content="Feedback - Chetna Mitra" />
        <meta property="og:description" content="Share your feedback and help us improve Chetna Mitra AI chatbot experience." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-background py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon name="MessageHeart" size={32} color="white" />
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  We Value Your
                  <span className="text-primary block lg:inline lg:ml-3">Feedback</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Your insights help us improve Chetna Mitra and create a better AI experience for everyone. 
                  Share your thoughts, report issues, or suggest new features.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-card rounded-lg p-4 border border-border shadow-sm">
                      <div className="flex items-center justify-center mb-2">
                        <Icon name={stat.icon} size={24} className="text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm font-medium text-foreground">{stat.label}</div>
                      <div className="text-xs text-muted-foreground">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {isSubmitted ? (
                <SuccessMessage onSubmitAnother={handleSubmitAnother} />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Feedback Form */}
                  <div className="lg:col-span-2">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Share Your Experience
                      </h2>
                      <p className="text-muted-foreground">
                        Help us understand how we can make Chetna Mitra even better for you.
                      </p>
                    </div>
                    
                    <FeedbackForm 
                      onSubmit={handleFeedbackSubmit}
                      isSubmitting={isSubmitting}
                    />
                  </div>

                  {/* Tips and FAQ Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-24">
                      <FeedbackTips />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Additional Information Section */}
          {!isSubmitted && (
            <section className="py-16 bg-muted/30">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Your Privacy Matters
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  We take your privacy seriously. All feedback is handled according to our privacy policy, 
                  and we never share your personal information with third parties.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <Icon name="Shield" size={32} className="text-success mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Secure</h3>
                    <p className="text-sm text-muted-foreground">
                      Your data is encrypted and stored securely
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <Icon name="Eye" size={32} className="text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Transparent</h3>
                    <p className="text-sm text-muted-foreground">
                      Clear communication about how we use feedback
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <Icon name="UserCheck" size={32} className="text-accent mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Respectful</h3>
                    <p className="text-sm text-muted-foreground">
                      Your feedback is valued and treated with respect
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Bot" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-foreground">Chetna Mitra</span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Chetna Mitra. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FeedbackPage;
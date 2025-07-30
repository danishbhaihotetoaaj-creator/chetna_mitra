import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import TableOfContents from './components/TableOfContents';
import PolicySection from './components/PolicySection';
import FAQSection from './components/FAQSection';
import DataPreferences from './components/DataPreferences';
import ContactInfo from './components/ContactInfo';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: 'Eye' },
    { id: 'data-collection', title: 'Data Collection', icon: 'Database' },
    { id: 'data-usage', title: 'How We Use Data', icon: 'Activity' },
    { id: 'data-sharing', title: 'Data Sharing', icon: 'Share2' },
    { id: 'user-rights', title: 'Your Rights', icon: 'Shield' },
    { id: 'security', title: 'Security Measures', icon: 'Lock' },
    { id: 'cookies', title: 'Cookies & Tracking', icon: 'Cookie' },
    { id: 'updates', title: 'Policy Updates', icon: 'RefreshCw' },
    { id: 'contact', title: 'Contact Information', icon: 'MessageCircle' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const currentSection = sectionElements.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const lastUpdated = new Date('2025-07-15').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Chetna Mitra</title>
        <meta name="description" content="Learn how Chetna Mitra protects your privacy and handles your data. Transparent privacy practices for our AI chatbot service." />
        <meta name="keywords" content="privacy policy, data protection, AI chatbot privacy, user rights" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <div className="pt-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                Your privacy matters to us. Learn how we collect, use, and protect your information when you use Chetna Mitra.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} />
                  <span>Last updated: {lastUpdated}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} />
                  <span>Version 2.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Table of Contents */}
            <div className="lg:col-span-1">
              <TableOfContents 
                sections={sections}
                activeSection={activeSection}
                onSectionClick={scrollToSection}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Overview */}
              <PolicySection id="overview" title="Overview" icon="Eye" isHighlighted>
                <p className="text-muted-foreground mb-4">
                  At Chetna Mitra, we are committed to protecting your privacy and ensuring transparency in how we handle your personal information. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you use our AI-powered chatbot service.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Key Principles</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• We collect only necessary information to provide our service</li>
                        <li>• Your data is never sold to third parties</li>
                        <li>• You have control over your personal information</li>
                        <li>• We use industry-standard security measures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </PolicySection>

              {/* Data Collection */}
              <PolicySection id="data-collection" title="Information We Collect" icon="Database">
                <h3 className="text-lg font-semibold text-foreground mb-3">Information You Provide</h3>
                <ul className="text-muted-foreground space-y-2 mb-6">
                  <li className="flex items-start space-x-2">
                    <Icon name="MessageSquare" size={16} className="text-primary flex-shrink-0 mt-1" />
                    <span><strong>Chat Messages:</strong> Conversations you have with our AI assistant</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="User" size={16} className="text-primary flex-shrink-0 mt-1" />
                    <span><strong>Account Information:</strong> Email address, username, and profile preferences</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="MessageCircle" size={16} className="text-primary flex-shrink-0 mt-1" />
                    <span><strong>Feedback:</strong> Comments, ratings, and suggestions you provide</span>
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">Information We Collect Automatically</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li className="flex items-start space-x-2">
                    <Icon name="Monitor" size={16} className="text-primary flex-shrink-0 mt-1" />
                    <span><strong>Usage Data:</strong> How you interact with our service, features used, and session duration</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Smartphone" size={16} className="text-primary flex-shrink-0 mt-1" />
                    <span><strong>Device Information:</strong> Browser type, operating system, and device identifiers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="MapPin" size={16} className="text-primary flex-shrink-0 mt-1" />
                    <span><strong>Location Data:</strong> General location based on IP address (country/region level)</span>
                  </li>
                </ul>
              </PolicySection>

              {/* Data Usage */}
              <PolicySection id="data-usage" title="How We Use Your Information" icon="Activity">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Bot" size={18} className="text-primary" />
                      <h4 className="font-medium text-foreground">Service Provision</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Process your messages and provide AI-powered responses tailored to your queries.
                    </p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="TrendingUp" size={18} className="text-primary" />
                      <h4 className="font-medium text-foreground">Service Improvement</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Analyze usage patterns to enhance AI accuracy and develop new features.
                    </p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Shield" size={18} className="text-primary" />
                      <h4 className="font-medium text-foreground">Security & Safety</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Detect and prevent fraud, abuse, and other harmful activities.
                    </p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Mail" size={18} className="text-primary" />
                      <h4 className="font-medium text-foreground">Communication</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send important updates, security alerts, and respond to your inquiries.
                    </p>
                  </div>
                </div>
              </PolicySection>

              {/* Data Sharing */}
              <PolicySection id="data-sharing" title="Information Sharing" icon="Share2">
                <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="AlertTriangle" size={18} className="text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">We Do Not Sell Your Data</h4>
                      <p className="text-sm text-muted-foreground">
                        We never sell, rent, or trade your personal information to third parties for marketing purposes.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3">Limited Sharing Scenarios</h3>
                <ul className="text-muted-foreground space-y-3">
                  <li className="flex items-start space-x-2">
                    <Icon name="Wrench" size={16} className="text-primary flex-shrink-0 mt-1" />
                    <span><strong>Service Providers:</strong> Trusted partners who help us operate our service (cloud hosting, analytics) under strict confidentiality agreements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Scale" size={16} className="text-primary flex-shrink-0 mt-1" />
                    <span><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Building" size={16} className="text-primary flex-shrink-0 mt-1" />
                    <span><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets (with user notification)</span>
                  </li>
                </ul>
              </PolicySection>

              {/* User Rights */}
              <PolicySection id="user-rights" title="Your Rights and Choices" icon="Shield">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Eye" size={18} className="text-success" />
                      <h4 className="font-medium text-foreground">Access</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Request a copy of the personal information we have about you.
                    </p>
                  </div>
                  <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Edit" size={18} className="text-warning" />
                      <h4 className="font-medium text-foreground">Correction</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Update or correct inaccurate personal information.
                    </p>
                  </div>
                  <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Trash2" size={18} className="text-error" />
                      <h4 className="font-medium text-foreground">Deletion</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Request deletion of your personal information and chat history.
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Download" size={18} className="text-primary" />
                      <h4 className="font-medium text-foreground">Portability</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Export your data in a machine-readable format.
                    </p>
                  </div>
                </div>
              </PolicySection>

              {/* Security */}
              <PolicySection id="security" title="Security Measures" icon="Lock">
                <p className="text-muted-foreground mb-4">
                  We implement comprehensive security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Lock" size={20} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Encryption</h4>
                    <p className="text-sm text-muted-foreground">
                      TLS 1.3 for data in transit, AES-256 for data at rest
                    </p>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Server" size={20} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Infrastructure</h4>
                    <p className="text-sm text-muted-foreground">
                      Secure cloud hosting with regular security audits
                    </p>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Users" size={20} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Access Control</h4>
                    <p className="text-sm text-muted-foreground">
                      Limited employee access with multi-factor authentication
                    </p>
                  </div>
                </div>
              </PolicySection>

              {/* Cookies */}
              <PolicySection id="cookies" title="Cookies and Tracking" icon="Cookie">
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar technologies to enhance your experience and analyze service usage.
                </p>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Essential Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Required for basic functionality like user authentication and security. These cannot be disabled.
                    </p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how you use our service to improve performance and user experience.
                    </p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Preference Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Remember your settings and preferences for a personalized experience.
                    </p>
                  </div>
                </div>
              </PolicySection>

              {/* Data Preferences Component */}
              <DataPreferences />

              {/* FAQ Section */}
              <FAQSection />

              {/* Updates */}
              <PolicySection id="updates" title="Policy Updates" icon="RefreshCw">
                <p className="text-muted-foreground mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
                </p>
                <div className="bg-muted/30 border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Bell" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Notification Process</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Email notification for significant changes</li>
                        <li>• In-app notification when you next visit</li>
                        <li>• 30-day notice period for major updates</li>
                        <li>• Updated version date clearly displayed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </PolicySection>

              {/* Contact Information */}
              <PolicySection id="contact" title="Contact Information" icon="MessageCircle">
                <ContactInfo />
              </PolicySection>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Chetna Mitra. All rights reserved. | 
                <span className="ml-1">Committed to protecting your privacy and data.</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicy;
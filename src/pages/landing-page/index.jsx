import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ChatWidget from './components/ChatWidget';
import FeatureHighlights from './components/FeatureHighlights';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Chetna Mitra - Your Intelligent AI Assistant</title>
        <meta 
          name="description" 
          content="Experience the future of AI assistance with Chetna Mitra. Get instant answers, personalized support, and intelligent conversations that understand your needs." 
        />
        <meta name="keywords" content="AI assistant, chatbot, artificial intelligence, conversation, support" />
        <meta property="og:title" content="Chetna Mitra - Your Intelligent AI Assistant" />
        <meta 
          property="og:description" 
          content="Experience the future of AI assistance with Chetna Mitra. Get instant answers, personalized support, and intelligent conversations." 
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/landing-page" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <ChatWidget />
          <FeatureHighlights />
          <TestimonialsSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import TechnologySection from './components/TechnologySection';
import MilestonesSection from './components/MilestonesSection';
import CallToActionSection from './components/CallToActionSection';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About - Chetna Mitra | AI Assistant by Independent Developer</title>
        <meta 
          name="description" 
          content="Learn about Chetna Mitra, an AI assistant created by an independent developer committed to ethical, privacy-first artificial intelligence technology." 
        />
        <meta name="keywords" content="AI technology, ethical AI, privacy-first, artificial intelligence, conversational AI, independent developer, solo project" />
        <meta property="og:title" content="About - Chetna Mitra | AI Assistant by Independent Developer" />
        <meta property="og:description" content="Discover the story behind Chetna Mitra, an AI assistant built by a passionate independent developer." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about-page" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <MissionSection />
          <TechnologySection />
          <MilestonesSection />
          <CallToActionSection />
        </main>

        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-muted-foreground">
                © {new Date().getFullYear()} Chetna Mitra. All rights reserved. Built with passion by an independent developer.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutPage;
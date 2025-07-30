import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import ChatInterface from "pages/chat-interface";
import AboutPage from "pages/about-page";
import LandingPage from "pages/landing-page";
import PrivacyPolicy from "pages/privacy-policy";
import FeedbackPage from "pages/feedback-page";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat-interface" element={<ChatInterface />} />
        <Route path="/about-page" element={<AboutPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/feedback-page" element={<FeedbackPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
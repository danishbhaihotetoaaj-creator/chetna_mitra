import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Chat Interface', path: '/chat-interface' },
      { label: 'About Us', path: '/about-page' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Feedback', path: '/feedback-page' }
    ],
    support: [
      { label: 'Help Center', path: '/feedback-page' },
      { label: 'Contact Us', path: '/feedback-page' },
      { label: 'Report Issue', path: '/feedback-page' },
      { label: 'Feature Request', path: '/feedback-page' }
    ],
    legal: [
      { label: 'Terms of Service', path: '/privacy-policy' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Cookie Policy', path: '/privacy-policy' },
      { label: 'Data Protection', path: '/privacy-policy' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'GitHub', icon: 'Github', url: '#' },
    { name: 'Mail', icon: 'Mail', url: 'mailto:support@chetnamitra.com' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/landing-page" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Bot" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Chetna Mitra
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your intelligent AI assistant for meaningful conversations, instant support, and personalized assistance. Experience the future of AI interaction today.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Chetna Mitra. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="Shield" size={16} className="mr-2 text-success" />
              Secure & Private
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="Zap" size={16} className="mr-2 text-warning" />
              99.9% Uptime
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
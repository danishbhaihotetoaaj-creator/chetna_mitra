import React from 'react';
import Icon from '../../../components/AppIcon';

const PartnershipsSection = () => {
  const partnerships = [
    {
      category: "Research Institutions",
      icon: "GraduationCap",
      partners: [
        {
          name: "MIT AI Lab",
          description: "Collaborative research on conversational AI safety and ethics"
        },
        {
          name: "Stanford HAI",
          description: "Human-centered AI research and development initiatives"
        },
        {
          name: "Carnegie Mellon LTI",
          description: "Natural language processing and understanding research"
        }
      ]
    },
    {
      category: "Privacy Organizations",
      icon: "Shield",
      partners: [
        {
          name: "Electronic Frontier Foundation",
          description: "Digital privacy rights advocacy and policy development"
        },
        {
          name: "Privacy International",
          description: "Global privacy standards and best practices implementation"
        },
        {
          name: "Future of Privacy Forum",
          description: "Privacy-preserving technology research and guidelines"
        }
      ]
    },
    {
      category: "Technology Partners",
      icon: "Cpu",
      partners: [
        {
          name: "Cloud Infrastructure Alliance",
          description: "Secure, scalable cloud computing infrastructure"
        },
        {
          name: "Open Source AI Foundation",
          description: "Contributing to open-source AI safety tools and frameworks"
        },
        {
          name: "Cybersecurity Consortium",
          description: "Advanced security protocols and threat detection systems"
        }
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Trusted Partnerships
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We collaborate with leading institutions and organizations to ensure our AI technology meets the highest standards of safety, privacy, and ethical responsibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {partnerships.map((category, index) => (
            <div key={index} className="bg-card rounded-2xl p-8 shadow-sm border border-border">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={category.icon} size={32} color="var(--color-primary)" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.category}
                </h3>
              </div>
              
              <div className="space-y-6">
                {category.partners.map((partner, partnerIndex) => (
                  <div key={partnerIndex} className="border-l-2 border-primary/20 pl-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      {partner.name}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <Icon name="Handshake" size={48} color="var(--color-primary)" className="mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Interested in Partnership?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              We're always looking to collaborate with organizations that share our commitment to ethical AI development and user privacy protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:partnerships@chetnamitra.ai" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                <Icon name="Mail" size={18} className="mr-2" />
                Contact Partnerships Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
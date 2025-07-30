import React from 'react';
import Icon from '../../../components/AppIcon';

const MilestonesSection = () => {
  const milestones = [
    {
      year: "2023",
      quarter: "Q1",
      title: "Company Founded",
      description: "Chetna Mitra was established with a vision to create ethical, human-centered AI technology.",
      icon: "Rocket"
    },
    {
      year: "2023",
      quarter: "Q2",
      title: "Core Team Assembled",
      description: "Brought together leading experts in AI, privacy, and human-computer interaction.",
      icon: "Users"
    },
    {
      year: "2023",
      quarter: "Q3",
      title: "Privacy-First Architecture",
      description: "Developed our proprietary zero-knowledge conversation processing system.",
      icon: "Shield"
    },
    {
      year: "2023",
      quarter: "Q4",
      title: "Beta Testing Launch",
      description: "Launched closed beta with 1,000+ users providing valuable feedback and insights.",
      icon: "TestTube"
    },
    {
      year: "2024",
      quarter: "Q1",
      title: "Public Release",
      description: "Officially launched Chetna Mitra to the public with enhanced safety features.",
      icon: "Globe"
    },
    {
      year: "2024",
      quarter: "Q2",
      title: "10K+ Active Users",
      description: "Reached our first major user milestone with 99.9% uptime and positive feedback.",
      icon: "TrendingUp"
    },
    {
      year: "2024",
      quarter: "Q3",
      title: "AI Safety Certification",
      description: "Received industry recognition for our commitment to AI safety and ethical practices.",
      icon: "Award"
    },
    {
      year: "2024",
      quarter: "Q4",
      title: "Continuous Innovation",
      description: "Ongoing development of advanced features while maintaining our privacy-first approach.",
      icon: "Lightbulb"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Our Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From concept to reality, here are the key milestones that have shaped Chetna Mitra into the trusted AI companion it is today.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full md:transform md:-translate-x-1.5 z-10"></div>
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon name={milestone.icon} size={20} color="var(--color-primary)" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-primary">
                          {milestone.year} {milestone.quarter}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MilestonesSection;
import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionSection = () => {
  const values = [
    {
      icon: "Heart",
      title: "Empathy First",
      description: "I believe AI should understand and respond with genuine care for human needs and emotions."
    },
    {
      icon: "Shield", 
      title: "Privacy Protected",
      description: "Your conversations and data are safeguarded with enterprise-grade security and transparency."
    },
    {
      icon: "Lightbulb",
      title: "Continuous Learning",
      description: "This AI evolves through responsible learning to provide better, more accurate assistance."
    },
    {
      icon: "Code",
      title: "Independent Development", 
      description: "Built by a passionate individual developer who believes in creating technology that truly serves people."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            My Mission & Values
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Chetna Mitra was born from a simple belief: artificial intelligence should enhance human potential while respecting individual privacy and dignity. As an independent developer, I'm committed to creating AI that truly understands and serves people, built with care and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Icon name={value.icon} size={32} color="var(--color-primary)" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icon name="User" size={32} color="var(--color-primary)" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              About the Developer
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Chetna Mitra is the passion project of an independent developer who believes in the power of ethical AI to make a positive impact. Every feature, every interaction, and every decision is made with careful consideration for user privacy, accessibility, and genuine usefulness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
import React from 'react';
import Image from '../../../components/AppImage';


const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      role: "Chief AI Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Former Google AI researcher with 12+ years in machine learning and natural language processing. PhD in Computer Science from MIT.",
      expertise: ["Machine Learning", "NLP", "AI Ethics"]
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Head of Engineering",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Full-stack architect with expertise in scalable AI systems. Previously led engineering teams at Microsoft and Amazon.",
      expertise: ["System Architecture", "Cloud Computing", "DevOps"]
    },
    {
      id: 3,
      name: "Sarah Chen",
      role: "Privacy & Security Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Cybersecurity expert specializing in AI privacy. Former security consultant for Fortune 500 companies.",
      expertise: ["Data Privacy", "Security", "Compliance"]
    },
    {
      id: 4,
      name: "Dr. Michael Rodriguez",
      role: "Research Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "AI researcher focused on conversational AI and human-computer interaction. Published 50+ papers in top-tier conferences.",
      expertise: ["Conversational AI", "HCI", "Research"]
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Product Strategy",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      bio: "Product strategist with 10+ years experience in AI products. Previously at OpenAI and Anthropic.",
      expertise: ["Product Strategy", "User Experience", "AI Safety"]
    },
    {
      id: 6,
      name: "David Park",
      role: "Community Relations",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Community builder passionate about responsible AI adoption. Background in tech communications and user advocacy.",
      expertise: ["Community Building", "Communications", "User Advocacy"]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our diverse team of AI researchers, engineers, and ethicists work together to create technology that serves humanity with integrity and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {member.bio}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
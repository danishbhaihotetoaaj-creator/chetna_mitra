import React from 'react';
import Icon from '../../../components/AppIcon';

const PolicySection = ({ id, title, icon, children, isHighlighted = false }) => {
  return (
    <section 
      id={id} 
      className={`scroll-mt-24 ${isHighlighted ? 'bg-muted/50 border border-border rounded-lg p-6' : 'mb-8'}`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={18} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      </div>
      <div className="prose prose-slate max-w-none">
        {children}
      </div>
    </section>
  );
};

export default PolicySection;
import React from 'react';
import Icon from '../../../components/AppIcon';

const TableOfContents = ({ sections, activeSection, onSectionClick }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="List" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Table of Contents</h3>
      </div>
      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 flex items-center justify-between ${
              activeSection === section.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <span>{section.title}</span>
            <Icon 
              name="ChevronRight" 
              size={14} 
              className={`transition-transform duration-200 ${
                activeSection === section.id ? 'rotate-90' : ''
              }`} 
            />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataPreferences = () => {
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: false,
    personalization: true,
    thirdParty: false
  });

  const handleToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    alert('Preferences saved successfully!');
  };

  const preferenceItems = [
    {
      key: 'analytics',
      title: 'Analytics & Performance',
      description: 'Help us improve our service by allowing analytics data collection',
      icon: 'BarChart3'
    },
    {
      key: 'marketing',
      title: 'Marketing Communications',
      description: 'Receive updates about new features and improvements',
      icon: 'Mail'
    },
    {
      key: 'personalization',
      title: 'Personalization',
      description: 'Allow us to personalize your experience based on usage patterns',
      icon: 'User'
    },
    {
      key: 'thirdParty',
      title: 'Third-party Integrations',
      description: 'Enable integrations with external services for enhanced functionality',
      icon: 'Link'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Settings" size={20} className="text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Data Collection Preferences</h3>
      </div>
      <p className="text-muted-foreground mb-6">
        Control how your data is used to improve your experience. You can change these settings at any time.
      </p>
      <div className="space-y-4 mb-6">
        {preferenceItems.map((item) => (
          <div key={item.key} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={item.icon} size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <button
              onClick={() => handleToggle(item.key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                preferences[item.key] ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  preferences[item.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      <Button onClick={handleSave} className="w-full sm:w-auto">
        Save Preferences
      </Button>
    </div>
  );
};

export default DataPreferences;
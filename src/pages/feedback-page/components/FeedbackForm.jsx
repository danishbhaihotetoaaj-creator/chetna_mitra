import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FeedbackForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    feedbackType: '',
    overallSatisfaction: 0,
    featureCategory: '',
    subject: '',
    description: '',
    email: '',
    allowContact: false,
    attachments: []
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const feedbackTypeOptions = [
    { value: 'bug-report', label: 'Bug Report', description: 'Report technical issues or errors' },
    { value: 'feature-request', label: 'Feature Request', description: 'Suggest new features or improvements' },
    { value: 'general-feedback', label: 'General Feedback', description: 'Share your overall experience' },
    { value: 'chat-accuracy', label: 'Chat Accuracy', description: 'Feedback about AI response quality' },
    { value: 'interface-usability', label: 'Interface Usability', description: 'Comments about user interface' }
  ];

  const featureCategoryOptions = [
    { value: 'chat-interface', label: 'Chat Interface' },
    { value: 'response-quality', label: 'Response Quality' },
    { value: 'response-time', label: 'Response Time' },
    { value: 'navigation', label: 'Navigation' },
    { value: 'mobile-experience', label: 'Mobile Experience' },
    { value: 'accessibility', label: 'Accessibility' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleStarRating = (rating) => {
    setFormData(prev => ({
      ...prev,
      overallSatisfaction: rating
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles].slice(0, 3) // Max 3 files
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.feedbackType) {
      newErrors.feedbackType = 'Please select a feedback type';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Feedback Type Selection */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2 text-primary" />
          Feedback Type
        </h3>
        <Select
          label="What type of feedback would you like to share?"
          options={feedbackTypeOptions}
          value={formData.feedbackType}
          onChange={(value) => handleInputChange('feedbackType', value)}
          error={errors.feedbackType}
          placeholder="Select feedback type"
          required
        />
      </div>

      {/* Overall Satisfaction Rating */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Star" size={20} className="mr-2 text-primary" />
          Overall Satisfaction
        </h3>
        <p className="text-muted-foreground mb-4">How satisfied are you with Chetna Mitra overall?</p>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleStarRating(star)}
              className="p-1 rounded-md hover:bg-muted transition-colors duration-200"
            >
              <Icon
                name="Star"
                size={32}
                className={`transition-colors duration-200 ${
                  star <= formData.overallSatisfaction
                    ? 'text-warning fill-current' :'text-muted-foreground hover:text-warning'
                }`}
              />
            </button>
          ))}
          {formData.overallSatisfaction > 0 && (
            <span className="ml-4 text-sm text-muted-foreground">
              {formData.overallSatisfaction} out of 5 stars
            </span>
          )}
        </div>
      </div>

      {/* Feature Category (conditional) */}
      {(formData.feedbackType === 'feature-request' || formData.feedbackType === 'general-feedback') && (
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Settings" size={20} className="mr-2 text-primary" />
            Feature Category
          </h3>
          <Select
            label="Which area does your feedback relate to?"
            options={featureCategoryOptions}
            value={formData.featureCategory}
            onChange={(value) => handleInputChange('featureCategory', value)}
            placeholder="Select a category"
          />
        </div>
      )}

      {/* Subject and Description */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Edit3" size={20} className="mr-2 text-primary" />
          Details
        </h3>
        <div className="space-y-4">
          <Input
            label="Subject"
            type="text"
            placeholder="Brief summary of your feedback"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            error={errors.subject}
            required
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description <span className="text-error">*</span>
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={6}
              placeholder="Please provide detailed feedback. What happened? What did you expect? How can we improve?"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-error">{errors.description}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              {formData.description.length}/1000 characters
            </p>
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Paperclip" size={20} className="mr-2 text-primary" />
          Attachments (Optional)
        </h3>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
            dragActive
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground mb-2">
            Drag and drop files here, or click to select
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Supports: JPG, PNG, GIF, PDF, TXT (max 5MB, up to 3 files)
          </p>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.gif,.pdf,.txt"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('file-upload').click()}
          >
            Select Files
          </Button>
        </div>

        {/* Attached Files */}
        {formData.attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-foreground">Attached Files:</p>
            {formData.attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-muted rounded-md p-2">
                <div className="flex items-center space-x-2">
                  <Icon name="File" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAttachment(index)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Mail" size={20} className="mr-2 text-primary" />
          Contact Information (Optional)
        </h3>
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            description="We'll only use this to follow up on your feedback if needed"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
          />
          <Checkbox
            label="Allow us to contact you about this feedback"
            description="We may reach out for clarification or to update you on the status"
            checked={formData.allowContact}
            onChange={(e) => handleInputChange('allowContact', e.target.checked)}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
          className="min-w-[140px]"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
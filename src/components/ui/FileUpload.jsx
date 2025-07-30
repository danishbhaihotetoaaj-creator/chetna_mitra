import React, { useState, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const FileUpload = ({ onFileSelect, disabled = false, accept = "image/*,.pdf,.doc,.docx,.txt" }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      const isValidType = accept.includes('*') || 
        accept.split(',').some(type => 
          file.type.includes(type.replace('*', '')) || 
          file.name.toLowerCase().endsWith(type.replace('*', ''))
        );
      return isValidSize && isValidType;
    });

    if (validFiles.length > 0) {
      onFileSelect?.(validFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files) {
      handleFileSelect(files);
    }
  };

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />
      
      <Button
        variant="ghost"
        size="icon"
        onClick={openFileDialog}
        disabled={disabled}
        className="hover:bg-accent hover:text-accent-foreground transition-colors"
        title="Upload files (images, documents)"
      >
        <Icon name="Paperclip" size={20} />
      </Button>

      {/* Drag and Drop Overlay */}
      {isDragOver && (
        <div
          className="fixed inset-0 bg-primary/10 backdrop-blur-sm z-50 flex items-center justify-center"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="bg-card border-2 border-dashed border-primary rounded-lg p-8 text-center max-w-md">
            <Icon name="Upload" size={48} className="mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Drop files here</h3>
            <p className="text-muted-foreground">
              Images, PDFs, and documents up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
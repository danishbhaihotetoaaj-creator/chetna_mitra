import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const FilePreview = ({ files, onRemoveFile }) => {
  if (!files || files.length === 0) return null;

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return 'Image';
    if (file.type === 'application/pdf') return 'FileText';
    if (file.type.includes('document') || file.type.includes('word')) return 'FileText';
    return 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-lg border border-border">
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center space-x-2 bg-card border border-border rounded-md p-2 group hover:shadow-sm transition-shadow"
        >
          <div className="flex-shrink-0">
            <Icon name={getFileIcon(file)} size={16} className="text-muted-foreground" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground truncate" title={file.name}>
              {file.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onRemoveFile?.(index)}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
            title="Remove file"
          >
            <Icon name="X" size={12} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FilePreview;
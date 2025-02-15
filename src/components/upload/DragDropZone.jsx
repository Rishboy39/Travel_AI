import React from 'react';
import { usePhotoUpload } from '../../hooks/usePhotoUpload';

const DragDropZone = ({ onFilesAdded }) => {
  const { handleDrop } = usePhotoUpload();

  return (
    <div 
      className="drag-drop-zone"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <p>Drag & drop your photos here</p>
      <input 
        type="file" 
        multiple 
        onChange={(e) => onFilesAdded(Array.from(e.target.files))}
      />
    </div>
  );
};

export default DragDropZone;

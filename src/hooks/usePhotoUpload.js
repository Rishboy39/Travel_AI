import { useState } from 'react';

export const usePhotoUpload = () => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    return droppedFiles;
  };

  return { dragActive, handleDrop };
};
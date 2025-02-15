// src/components/upload/PhotoUpload.jsx
import React, { useState } from 'react';
import DragDropZone from './DragDropZone';
import PhotoPreview from './PhotoPreview';
import '../../styles/components/PhotoUpload.css';

const PhotoUpload = () => {
  const [photos, setPhotos] = useState([]);

  return (
    <div className="photo-upload">
      <DragDropZone onFilesAdded={(files) => setPhotos([...photos, ...files])} />
      <PhotoPreview files={photos} onRemove={(id) => {
        setPhotos(photos.filter(photo => photo.id !== id));
      }} />
    </div>
  );
};

export default PhotoUpload;
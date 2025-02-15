import React from 'react';

const PhotoPreview = ({ files, onRemove }) => {
  return (
    <div className="photo-preview">
      {files.map((file, index) => (
        <div key={index} className="preview-item">
          <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
          <button onClick={() => onRemove(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default PhotoPreview;
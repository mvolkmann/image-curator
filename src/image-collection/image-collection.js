import React from 'react';

import './image-collection.scss';

const ImageCollection = ({collection}) => {
  if (!collection) return null;
  return (
    <div className="image-collection">
      <h3>{collection.name}</h3>
      {collection.images.map((image, index) => (
        <img alt="member" key={`img${index}`} src={image} />
      ))}
    </div>
  );
};

export default ImageCollection;

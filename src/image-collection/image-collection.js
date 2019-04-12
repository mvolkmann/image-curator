import {EasyContext} from 'context-easy';
import React, {useContext, useState} from 'react';
import './image-collection.scss';

const ImageCollection = ({collection}) => {
  if (!collection) return null;

  const context = useContext(EasyContext);

  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedHashes, setSelectedHashes] = useState({});

  function deleteSelected() {
    const {images} = collection;
    const newImages = images.filter(image => !selectedHashes[image.hash]);
    const path = `collections.${collection.name}.images`;
    context.set(path, newImages);
    setSelectedCount(0);
  }

  function onClick(image) {
    const {hash} = image;
    const selected = selectedHashes[hash];
    const newHashes = {...selectedHashes};

    if (selected) {
      delete newHashes[hash];
      setSelectedCount(count => count - 1);
    } else {
      newHashes[hash] = true;
      setSelectedCount(count => count + 1);
    }

    setSelectedHashes(newHashes);
  }

  const cn = selectedCount === 0 ? 'disabled' : 'enabled';

  return (
    <div className="image-collection">
      <label>
        Images for {collection.name}
        <span className={`trashcan ${cn}`} onClick={deleteSelected}>
          &#x1f5d1;
        </span>
      </label>
      {collection.images.map(image => {
        const selected = selectedHashes[image.hash];
        const className = selected ? 'selected' : '';
        return (
          <img
            alt="member"
            className={className}
            key={image.hash}
            onClick={() => onClick(image)}
            src={image.url}
          />
        );
      })}
    </div>
  );
};

export default ImageCollection;

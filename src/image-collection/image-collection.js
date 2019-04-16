import {EasyContext} from 'context-easy';
import {arrayOf, objectOf, shape, string} from 'prop-types';
import React, {useContext, useState} from 'react';
import './image-collection.scss';

function ImageCollection({dataset, collection}) {
  if (!dataset || !collection) return null;
  console.log('image-collection.js x: dataset =', dataset);
  console.log('image-collection.js x: collection =', collection);

  const context = useContext(EasyContext);

  const [moveTo, setMoveTo] = useState('');
  const [selectedHashes, setSelectedHashes] = useState({});

  function changeMoveTo(event) {
    setMoveTo(event.target.value);
  }

  async function deleteSelected() {
    const {images} = collection;
    const newImages = images.filter(image => !selectedHashes[image.hash]);
    const path = `datasets.${dataset.name}.collections.${
      collection.name
    }.images`;
    context.set(path, newImages);
    setSelectedHashes({});
  }

  function move() {
    const srcImages = collection.images;
    const {datasets, selectedDatasetName} = context;
    const dataset = datasets[selectedDatasetName];
    const destImages = dataset.collections[moveTo].images;
    let newSrcImages = [...srcImages];
    const newDestImages = [...destImages];
    for (const hash of Object.keys(selectedHashes)) {
      const imageToMove = srcImages.find(image => image.hash === Number(hash));
      newSrcImages = newSrcImages.filter(
        image => image.hash !== imageToMove.hash
      );
      newDestImages.push(imageToMove);
    }

    let path = `datasets.${dataset.name}.collections.${collection.name}.images`;
    context.set(path, newSrcImages);

    path = `datasets.${dataset.name}.collections.${moveTo}.images`;
    context.set(path, newDestImages);

    setSelectedHashes({});
  }

  function onClick(image) {
    const {hash} = image;
    const selected = selectedHashes[hash];
    const newHashes = {...selectedHashes};

    if (selected) {
      delete newHashes[hash];
    } else {
      newHashes[hash] = true;
    }

    setSelectedHashes(newHashes);
  }

  const anySelected = Object.keys(selectedHashes).length > 0;
  const cn = anySelected ? 'enabled' : 'disabled';

  return (
    <div className="image-collection">
      <label>Images for {collection.name}</label>
      <div className="move-row">
        <label className="move-to">Move To</label>
        <select onChange={changeMoveTo} value={moveTo}>
          {Object.keys(dataset.collections).map(name => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <button disabled={!anySelected} onClick={move}>
          Move
        </button>
        <span className={`trashcan ${cn}`} onClick={deleteSelected}>
          &#x1f5d1;
        </span>
      </div>
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
}

const collectionType = shape({
  name: string,
  images: arrayOf(string)
});
ImageCollection.propTypes = {
  collection: collectionType,
  dataset: shape({
    name: string,
    collections: objectOf(collectionType)
  })
};

export default ImageCollection;

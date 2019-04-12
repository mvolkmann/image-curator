import {EasyContext} from 'context-easy';
import React, {useContext, useState} from 'react';
import './image-collection.scss';

const ImageCollection = ({collection}) => {
  if (!collection) return null;

  const context = useContext(EasyContext);

  const [moveTo, setMoveTo] = useState('');
  const [selectedHashes, setSelectedHashes] = useState({});

  function changeMoveTo(event) {
    setMoveTo(event.target.value);
  }

  //TODO: Implement this!
  function confirm(msg) {
    console.log(msg);
    return true;
  }

  async function deleteSelected() {
    const {images, name} = collection;
    let msg = `Are you sure you want to delete the ${name} collection?`;
    if (images.length)
      msg += ` It contains ${images.length} images that will be deleted.`;
    const confirmed = await confirm(msg);
    if (confirmed) {
      const newImages = images.filter(image => !selectedHashes[image.hash]);
      const path = `collections.${collection.name}.images`;
      context.set(path, newImages);
      setSelectedHashes({});
    }
  }

  function move() {
    const srcImages = collection.images;
    const destImages = context.collections[moveTo].images;
    let newSrcImages = [...srcImages];
    const newDestImages = [...destImages];
    for (const hash of Object.keys(selectedHashes)) {
      const imageToMove = srcImages.find(image => image.hash === Number(hash));
      newSrcImages = newSrcImages.filter(
        image => image.hash !== imageToMove.hash
      );
      newDestImages.push(imageToMove);
    }
    context.set(`collections.${collection.name}.images`, newSrcImages);
    context.set(`collections.${moveTo}.images`, newDestImages);
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
      <div>
        <label className="move-to">Move To</label>
        <select onChange={changeMoveTo} value={moveTo}>
          {Object.keys(context.collections).map(name => (
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
};

export default ImageCollection;

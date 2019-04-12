import {EasyContext} from 'context-easy';
import React, {useContext} from 'react';
import CollectionSelect from '../collection-select/collection-select';
import ImageCollection from '../image-collection/image-collection';
import ImageUpload from '../image-upload/image-upload';
import './image-curator.scss';

export default function ImageCurator() {
  const context = useContext(EasyContext);
  const {collections, selectedCollectionName} = context;
  const collection = collections[selectedCollectionName];
  return (
    <div className="image-curator">
      <header className="App-header">Image Curator</header>
      <div className="body">
        <CollectionSelect />
        <ImageUpload />
        <ImageCollection collection={collection} />
      </div>
    </div>
  );
}

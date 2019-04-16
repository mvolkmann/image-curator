import {EasyContext} from 'context-easy';
import React, {useContext} from 'react';
import CollectionSelect from '../collection-select/collection-select';
import DatasetSelect from '../dataset-select/dataset-select';
import ImageCollection from '../image-collection/image-collection';
import ImageUpload from '../image-upload/image-upload';
import './image-curator.scss';

export default function ImageCurator() {
  const context = useContext(EasyContext);
  const {datasets, selectedCollectionName, selectedDatasetName} = context;

  const dataset = datasets[selectedDatasetName];
  const collection = dataset
    ? dataset.collections[selectedCollectionName]
    : null;

  return (
    <div className="image-curator">
      <header>Image Curator</header>
      <div className="body">
        <DatasetSelect />
        <CollectionSelect />
        <ImageUpload />
        <ImageCollection dataset={dataset} collection={collection} />
      </div>
    </div>
  );
}

import {EasyContext, Input} from 'context-easy';
import {confirm} from '../confirm/confirm';
import React, {useContext} from 'react';
import Modal from 'react-modal';
import './collection-select.scss';

export default function CollectionSelect() {
  const context = useContext(EasyContext);

  function addCollection() {
    const {datasets, newCollectionName: name, selectedDatasetName} = context;
    if (!name) return;

    const {collections} = datasets[selectedDatasetName];
    const collection = {name, images: []};
    context.set(`datasets.${selectedDatasetName}.collections`, {
      ...collections,
      [name]: collection
    });
    context.set('newCollectionName', '');
    context.set('selectedCollectionName', name);
    context.toggle('addingCollection');
  }

  async function deleteCollection() {
    const {datasets, selectedCollectionName, selectedDatasetName} = context;
    const {collections} = datasets[selectedDatasetName];
    const collectionToDelete = collections[selectedCollectionName];
    const {images, name} = collectionToDelete;

    let msg = `Are you sure you want to delete the ${name} collection?`;
    if (images.length) {
      msg += ` It contains ${images.length} images that will be deleted.`;
    }
    const confirmed = await confirm(msg);
    console.log(
      'collection-select.js deleteCollection: confirmed =',
      confirmed
    );
    if (!confirmed) return;

    const newCollections = {};
    for (const name of Object.keys(collections)) {
      if (name !== selectedCollectionName) {
        newCollections[name] = collections[name];
      }
    }
    context.set(`datasets.${selectedDatasetName}.collections`, newCollections);
  }

  function toggleModal() {
    context.toggle('addingCollection');
  }

  function onChange(event) {
    context.set('selectedCollectionName', event.target.value);
  }

  const {
    datasets,
    newCollectionName,
    selectedCollectionName,
    selectedDatasetName
  } = context;
  console.log(
    'collection-select.js x: selectedDatasetName =',
    selectedDatasetName
  );
  const dataset = datasets[selectedDatasetName];
  if (!dataset) return null;

  const {collections} = dataset;

  // Why is this necessary?
  Modal.setAppElement('#root');

  return (
    <div className="collection-select">
      <Modal isOpen={context.addingCollection} onRequestClose={toggleModal}>
        <header>
          <div>Add Collection</div>
          <div aria-label="close modal" onClick={toggleModal} role="img">
            &#x2716;
          </div>
        </header>
        <div className="body">
          <div>
            <label>Collection Name</label>
            <Input autoFocus onEnter={addCollection} path="newCollectionName" />
          </div>
          <button disabled={!newCollectionName} onClick={addCollection}>
            Add
          </button>
        </div>
      </Modal>
      <label>Collection</label>
      <select onChange={onChange} value={selectedCollectionName}>
        {Object.keys(collections)
          .sort()
          .map(name => (
            <option key={name}>{name}</option>
          ))}
      </select>
      <button className="add" onClick={toggleModal}>
        <span aria-label="add collection" role="img">
          &#x2795;
        </span>
      </button>
      <button
        className="delete"
        disabled={!selectedCollectionName}
        onClick={deleteCollection}
      >
        <span aria-label="delete collection" role="img">
          &#x2716;
        </span>
      </button>
    </div>
  );
}

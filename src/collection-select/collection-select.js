import {EasyContext, Input} from 'context-easy';
import {confirm} from '../confirm/confirm';
import React, {useContext} from 'react';
import Modal from 'react-modal';
import './collection-select.scss';

export default function CollectionSelect() {
  const context = useContext(EasyContext);

  function addCollection() {
    const {collections, newCollectionName: name} = context;
    if (!name) return;

    const collection = {name, images: []};
    context.set('collections', {...collections, [name]: collection});
    context.set('newCollectionName', '');
    context.set('selectedCollectionName', name);
    context.toggle('addingCollection');
  }

  async function deleteCollection() {
    const {collections, selectedCollectionName} = context;
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
    context.set('collections', newCollections);
  }

  function toggleModal() {
    context.toggle('addingCollection');
  }

  function onChange(event) {
    context.set('selectedCollectionName', event.target.value);
  }

  const {collections, newCollectionName, selectedCollectionName} = context;

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

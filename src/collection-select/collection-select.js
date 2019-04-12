import {EasyContext, Input} from 'context-easy';
import React, {useContext} from 'react';
import Modal from 'react-modal';
import './collection-select.scss';

function CollectionSelect() {
  const context = useContext(EasyContext);

  function addCollection() {
    const {collections, newCollectionName: name} = context;
    const collection = {name, images: []};
    context.set('collections', {...collections, name: collection});
    context.toggle('addingCollection');
  }

  function deleteCollection() {
    console.log('collection-select.js deleteCollection: entered');
  }

  function toggleModal() {
    context.toggle('addingCollection');
  }

  function onChange(event) {
    context.set('selectedCollectionName', event.target.value);
  }

  const {collections, selectedCollectionName} = context;

  //Modal.setAppElement('.image-curator');

  return (
    <div className="collection-select">
      {/* <Modal
        isOpen={context.addingCollection}
        onRequestClose={toggleModal}
        contentLabel="Add Collection"
      >
        <div>Add Collection</div>
        <Input path="newCollectionName" />
        <button onClick={addCollection}>Add</button>
      </Modal> */}
      <label>Collection</label>
      <select onChange={onChange} value={selectedCollectionName}>
        {Object.keys(collections).map(name => (
          <option key={name}>{name}</option>
        ))}
      </select>
      <button className="add" onClick={toggleModal}>
        <span aria-label="add collection" role="img">
          &#x2795;
        </span>
      </button>
      <button className="delete" onClick={deleteCollection}>
        <span aria-label="delete collection" role="img">
          &#x2716;
        </span>
      </button>
    </div>
  );
}

export default CollectionSelect;

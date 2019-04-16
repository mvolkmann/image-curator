import {EasyContext, Input} from 'context-easy';
import {confirm} from '../confirm/confirm';
import React, {useContext} from 'react';
import Modal from 'react-modal';
import './dataset-select.scss';

export default function DatasetSelect() {
  const context = useContext(EasyContext);

  function addDataset() {
    const {datasets, newDatasetName: name} = context;
    if (!name) return;

    const unnamedCollection = {name: '', images: []};
    const dataset = {name, collections: {'': unnamedCollection}};

    context.set('datasets', {...datasets, [name]: dataset});
    context.set('newDatasetName', '');
    context.set('selectedDatasetName', name);
    context.toggle('addingDataset');
  }

  async function deleteDataset() {
    const {datasets, selectedDatasetName} = context;
    const datasetToDelete = datasets[selectedDatasetName];
    const {collections, name} = datasetToDelete;

    let msg = `Are you sure you want to delete the ${name} dataset?`;
    if (collections.length) {
      msg += ` It contains ${
        collections.length
      } collections that will be deleted.`;
    }
    const confirmed = await confirm(msg);
    if (!confirmed) return;

    const newDatasets = {};
    for (const name of Object.keys(datasets)) {
      if (name !== selectedDatasetName) {
        newDatasets[name] = datasets[name];
      }
    }
    context.set('datasets', newDatasets);
  }

  function toggleModal() {
    context.toggle('addingDataset');
  }

  function onChange(event) {
    context.set('selectedDatasetName', event.target.value);
  }

  const {datasets, newDatasetName, selectedDatasetName} = context;

  // Why is this necessary?
  Modal.setAppElement('#root');

  return (
    <div className="dataset-select">
      <Modal isOpen={context.addingDataset} onRequestClose={toggleModal}>
        <header>
          <div>Add Dataset</div>
          <div aria-label="close modal" onClick={toggleModal} role="img">
            &#x2716;
          </div>
        </header>
        <div className="body">
          <div>
            <label>Dataset Name</label>
            <Input autoFocus onEnter={addDataset} path="newDatasetName" />
          </div>
          <button disabled={!newDatasetName} onClick={addDataset}>
            Add
          </button>
        </div>
      </Modal>
      <label>Dataset</label>
      <select onChange={onChange} value={selectedDatasetName}>
        {Object.keys(datasets)
          .sort()
          .map(name => (
            <option key={name}>{name}</option>
          ))}
      </select>
      <button className="add" onClick={toggleModal}>
        <span aria-label="add dataset" role="img">
          &#x2795;
        </span>
      </button>
      <button
        className="delete"
        disabled={!selectedDatasetName}
        onClick={deleteDataset}
      >
        <span aria-label="delete dataset" role="img">
          &#x2716;
        </span>
      </button>
    </div>
  );
}

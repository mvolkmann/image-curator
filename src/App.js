import {EasyProvider} from 'context-easy';
import React from 'react';
import ConfirmDialog from './confirm/confirm';
import ImageCurator from './image-curator/image-curator';
import './App.scss';

const initialState = {
  addingCollection: false,
  addingDataset: false,
  datasets: {},
  newCollectionName: '',
  newDatasetName: '',
  selectedCollectionName: '',
  selectedDatasetName: '',
  uploadType: 'files'
};

const App = () => (
  <EasyProvider initialState={initialState} log validate>
    <ConfirmDialog />
    <ImageCurator />
  </EasyProvider>
);

export default App;

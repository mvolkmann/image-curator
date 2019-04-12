import {EasyProvider} from 'context-easy';
import React from 'react';
import ConfirmDialog from './confirm/confirm';
import ImageCurator from './image-curator/image-curator';
import './App.scss';

const unnamedCollection = {
  name: '',
  images: []
};

const initialState = {
  addingCollection: false,
  collections: {
    '': unnamedCollection,
    Corn: {
      name: 'Corn',
      images: []
    },
    Rice: {
      name: 'Rice',
      images: []
    },
    Tomato: {
      name: 'Tomato',
      images: []
    }
  },
  newCollectionName: '',
  selectedCollectionName: '',
  uploadType: 'files'
};

const App = () => (
  <EasyProvider initialState={initialState} log validate>
    <ConfirmDialog />
    <ImageCurator />
  </EasyProvider>
);

export default App;

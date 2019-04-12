import {EasyProvider} from 'context-easy';
import React from 'react';
import ImageCurator from './image-curator/image-curator';
import './App.scss';

const unnamedCollection = {
  name: '',
  images: []
};

const initialState = {
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
  selectedCollectionName: '',
  uploadType: 'files'
};

const App = () => (
  <EasyProvider initialState={initialState} log validate>
    <ImageCurator />
  </EasyProvider>
);

export default App;

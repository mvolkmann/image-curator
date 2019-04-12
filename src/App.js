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
    corn: {
      name: 'Corn',
      images: []
    },
    rice: {
      name: 'Rice',
      images: []
    },
    tomato: {
      name: 'Tomato',
      images: []
    }
  },
  selectedCollectionName: ''
};

const App = () => (
  <EasyProvider initialState={initialState} log validate>
    <ImageCurator />
  </EasyProvider>
);

export default App;

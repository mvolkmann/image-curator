import React, {Component} from 'react';
import ImageUpload from './image-upload/image-upload';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">Image Curator</header>
        <ImageUpload />
      </div>
    );
  }
}

export default App;

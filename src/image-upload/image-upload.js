import {EasyContext, Select} from 'context-easy';
import React, {useContext, useRef, useState} from 'react';
import {stringHash} from '../string-util';

import './image-upload.scss';

const imageMimeTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/x-png'];

function isImage(file) {
  return imageMimeTypes.includes(file.type);
}

export default function ImageUpload() {
  const context = useContext(EasyContext);
  const [file, setFile] = useState('');
  const fileInputRef = useRef();

  if (!context.selectedDatasetName) return null;

  function onChange(event) {
    const input = event.target;
    const {files, value} = input;
    setFile(value);

    for (const file of files) {
      console.log('image-upload.js x: file.type =', file.type);
      if (!isImage(file)) continue;

      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          const {selectedDatasetName, selectedCollectionName} = context;
          const path = `datasets.${selectedDatasetName}.collections.${selectedCollectionName}.images`;
          const existingImages = context.get(path) || [];
          const url = reader.result;
          const hash = stringHash(url);
          const existingImage = existingImages.find(
            image => image.hash === hash
          );
          if (!existingImage) context.push(path, {hash, url});
        },
        false
      );
      reader.readAsDataURL(file);
    }
  }

  const inputProps =
    context.uploadType === 'directory'
      ? {directory: '', webkitdirectory: ''}
      : {};

  return (
    <div className="image-upload">
      <label>Upload</label>
      <Select path="uploadType">
        <option>files</option>
        <option>directory</option>
      </Select>
      <input
        accept={imageMimeTypes.join(',')}
        multiple
        onChange={onChange}
        ref={fileInputRef}
        style={{display: 'none'}}
        type="file"
        value={file}
        {...inputProps}
      />
      <button onClick={() => fileInputRef.current.click()}>Browse...</button>
    </div>
  );
}

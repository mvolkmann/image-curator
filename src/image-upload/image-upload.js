import {EasyContext} from 'context-easy';
import React, {useContext, useState} from 'react';
import {stringHash} from '../string-util';

import './image-upload.scss';

export default function ImageUpload() {
  const context = useContext(EasyContext);
  const [file, setFile] = useState('');

  function onChange(event) {
    const input = event.target;
    const {files, value} = input;
    setFile(value);

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        const {selectedCollectionName} = context;
        const path = `collections.${selectedCollectionName}.images`;
        const url = reader.result;
        const hash = stringHash(url);
        context.push(path, {hash, url});
      },
      false
    );

    reader.readAsDataURL(files[0]);
  }

  return (
    <div className="image-upload">
      <label>Upload</label>
      <input
        accept="image/x-png,image/gif,image/jpeg"
        onChange={onChange}
        type="file"
        value={file}
      />
    </div>
  );
}

import {EasyContext} from 'context-easy';
import React, {useContext, useState} from 'react';

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
        context.push(path, reader.result);
      },
      false
    );

    reader.readAsDataURL(files[0]);
  }

  return (
    <div className="image-upload">
      <input
        accept="image/x-png,image/gif,image/jpeg"
        onChange={onChange}
        type="file"
        value={file}
      />
    </div>
  );
}

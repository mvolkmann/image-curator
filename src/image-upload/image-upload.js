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

    for (const file of files) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          const {selectedCollectionName} = context;
          const path = `collections.${selectedCollectionName}.images`;
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

  return (
    <div className="image-upload">
      <label>Upload</label>
      <input
        accept="image/x-png,image/gif,image/jpeg"
        multiple
        onChange={onChange}
        type="file"
        value={file}
      />
    </div>
  );
}

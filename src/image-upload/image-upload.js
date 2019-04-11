import React, {useState} from 'react';

export default function ImageUpload() {
  const [file, setFile] = useState('');

  const imgRef = React.createRef();

  function onChange(event) {
    const input = event.target;
    setFile(input.value);

    const file = input.files[0];
    console.log('image-upload.js onChange: file =', file);

    const reader = new FileReader();
    reader.addEventListener('load', () => setPreview(reader), false);
    reader.readAsDataURL(file);
  }

  function setPreview(reader) {
    console.log('image-upload.js setPreview: imgRef =', imgRef);
    console.log('image-upload.js setPreview: reader =', reader);
    const {current} = imgRef;
    //TODO: Why is current never set?
    if (current) current.src = reader.result;
  }

  return (
    <div className="image-upload">
      <input
        accept="image/x-png,image/gif,image/jpeg"
        onChange={onChange}
        type="file"
        value={file}
      />
      <img alt="preview" ref={imgRef} />
    </div>
  );
}

import {EasyContext} from 'context-easy';
import React, {useContext} from 'react';

function CollectionSelect() {
  const context = useContext(EasyContext);

  function onChange(event) {
    context.set('selectedCollectionName', event.target.value);
  }

  const {collections, selectedCollectionName} = context;

  return (
    <select onChange={onChange} value={selectedCollectionName}>
      {Object.keys(collections).map(name => (
        <option key={name}>{name}</option>
      ))}
    </select>
  );
}

export default CollectionSelect;

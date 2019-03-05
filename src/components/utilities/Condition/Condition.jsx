import React from 'react';

const Condition = (props) => {
  const { id, name } = props;

  return (
    <option value={id}>Condition - {name}</option>
  );
}

export default Condition;
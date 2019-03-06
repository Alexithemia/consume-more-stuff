import React from 'react';

const Status = (props) => {
  const { id, name } = props;

  return (
    <option value={id}>Status - {name}</option>
  );
}

export default Status;
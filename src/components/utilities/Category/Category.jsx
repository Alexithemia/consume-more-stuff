import React from 'react';

const Category = (props) => {
  const { id, name } = props;

  return (
    <option value={ id }>{ name }</option>
  );
}

export default Category;

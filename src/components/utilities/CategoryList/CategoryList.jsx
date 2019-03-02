import React from 'react';
import Category from '../Category';

const CategoryList = (props) => {
  const categoryList = props.categories.map(category => {
    return (
      <Category key={ category.id } id={ category.id } name={ category.name } />
    );
  });

  return (
    <>
      { categoryList }
    </>
  )
}

export default CategoryList;

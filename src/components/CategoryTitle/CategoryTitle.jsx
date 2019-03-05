import React from 'react';

const CategoryTitle = (props) => {
  console.log(props.categoryTitle[0])
  if (props.categoryTitle[0]) {
    return (
      <h1 className="title">{props.categoryTitle[0].category.name}</h1>
    )

  } else {
    return null
  }
}
export default CategoryTitle;
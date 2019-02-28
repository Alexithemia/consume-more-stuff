import React, { Component } from 'react';
import './Navigation.scss';

const Navigation = (props) => {
  console.log('COMPONENT LOGGINGGGGGGGGGGG');
  console.log(props);

  const categoryList = props.categories.map(current => {
    const { id, name } = current;

    return (
      <li className="navItem">
        <span className="text">{ current.name }</span>
      </li>
    );
  });

  return (
    <div className="navigation">
      <div className="navTitle">
        <span className="text">Home</span>
      </div>

      <ul className="navMenu">
        { categoryList }
      </ul>
    </div>
  );
}

export default Navigation;

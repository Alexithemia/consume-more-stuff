import React from 'react';
import './Navigation.scss';
import { Link } from 'react-router-dom';

const Navigation = (props) => {

  const categoryList = props.categories.map(current => {
    const { id, name } = current;

    return (
      <li key={id} className="navItem">
        <Link to={`/category/${id}`} className="text">{name}</Link>
      </li>
    );
  });

  return (
    <div className="navigation">
      <div className="navTitle">
        <span className="text">Home</span>
      </div>

      <ul className="navMenu">
        {categoryList}
      </ul>
    </div>
  );
}

export default Navigation;

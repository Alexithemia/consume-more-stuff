import React from 'react';
import './Navigation.scss';
import { Link } from 'react-router-dom';

import NewPost from '../../containers/NewPost';

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
        <span className="text">Categories</span>
      </div>

      <ul className="navMenu">
        {categoryList}
      </ul>

      {props.isLoggedIn ?
        <>
          <div className="navTitle">
            <span className="text">Dashboard</span>
          </div>

          <ul className="navMenu">
            <li className="navItem">
              <Link to="/dashboard/your-posts" className="text">Your Posts</Link>
            </li>

            <li className="navItem">
              <Link to="/dashboard/messages" className="text">Messages</Link>
            </li>

            <li className="navItem">
              <Link to="/dashboard/settings" className="text">Settings</Link>
            </li>
          </ul>

          <NewPost categories={props.categories} />
        </>
        : null
      }
    </div>
  );


}


export default Navigation;

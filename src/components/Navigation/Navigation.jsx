import React from 'react';
import './Navigation.scss';
import { Link } from 'react-router-dom';

import NewPost from '../../containers/NewPost';

const Navigation = (props) => {


  const categoryList = props.categories.map(current => {
    const { id, name } = current;



    return (
      <li key={id} className="navItem" onClick={props.selectNav}>
        {props.selected === name ?
          <Link to={`/category/${id}`} className="text select">{name}</Link>
          :
          <Link to={`/category/${id}`} className="text">{name}</Link>
        }
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
            <li className="navItem" onClick={props.selectNav}>
              {props.selected === 'Your Posts' ?
                <Link to="/dashboard/your-posts" className="text select">Your Posts</Link>
                :
                <Link to="/dashboard/your-posts" className="text">Your Posts</Link>
              }
            </li>

            <li className="navItem" onClick={props.selectNav}>
              {props.selected === 'Messages' ?
                <Link to="/dashboard/messages" className="text select">Messages</Link>
                :
                <Link to="/dashboard/messages" className="text">Messages</Link>
              }
            </li>

            <li className="navItem" onClick={props.selectNav}>
              {props.selected === 'Settings' ?
                <Link to="/dashboard/settings" className="text select">Settings</Link>
                :
                <Link to="/dashboard/settings" className="text">Settings</Link>
              }
            </li>
          </ul>

          <NewPost categories={props.categories} />
        </>
        :
        <div className="navTitle">Log in for more!</div>
      }
    </div>
  );
}


export default Navigation;

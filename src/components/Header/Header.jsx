import React from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import './Header.scss';
import Login from '../Login/Login';

const Header = (props) => {
  const { title } = props;

  return (
    <div className="header">
      <div className="headerWrap">
        <div className="titleWrap">
          <div className="logo">
            {/* <img src="" alt="" srcSet=""/> */}
            {/* use a blank square for now */}
            <div className="placeholderLogo"></div>
          </div>
          <div className="title">{title}</div>
        </div>

        <div className="searchWrap">
          <form className="searchBar">
            <input type="text" value="" placeholder="Start typing..." className="search" />
          </form>
          <div className="searchIcon">
            <img src="https://image.flaticon.com/icons/svg/126/126474.svg" alt="search icon" srcset="" />
          </div>
        </div>

        <div className="loginStatusWrap">
          {/* If user authenticated, then display: "Hello, { user.username } <a href="/">Log out</a> */}
          <div className="loginStatus">
            Need an account?
            <Link to='/login' className="refLogin"> Log in here</Link>
            <Route path='/login' component={Login} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

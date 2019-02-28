import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

import SearchBar from '../../containers/SearchBar';

const Header = (props) => {
  const { title, isLoggedIn, username } = props;

  return (
    <div className="header">
      <div className="headerWrap">
        <Link to="/" className="titleWrap">
          <div className="logo">
            {/* <img src="" alt="" srcSet=""/> */}
            {/* use a blank square for now */}
            <div className="placeholderLogo"></div>
          </div>
          <div className="title">{title}</div>
        </Link>

        <SearchBar />

        <div className="loginStatusWrap">
          {/* If user authenticated, then display: "Hello, { user.username } <a href="/">Log out</a> */}
          {isLoggedIn ?
            <div className="loginStatus">
              Welcome back, {username}! <span className="refLogin">Logout</span>
            </div>
            :
            <div className="loginStatus">
              Need an account?
              <Link to="/login" className="refLogin">
                Log in here.
              </Link>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;

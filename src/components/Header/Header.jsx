import React from 'react';
import './Header.scss';

import SearchBar from '../../containers/SearchBar';

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
          <div className="title">{ title }</div>
        </div>

        <SearchBar />

        <div className="loginStatusWrap">
          {/* If user authenticated, then display: "Hello, { user.username } <a href="/">Log out</a> */}
          <div className="loginStatus">
            Need an account? <a href="/login" className="refLogin">
              Log in here.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import SearchBar from '../../containers/SearchBar';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props)

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e) {
    e.preventDefault();

    this.props.logout()
      .then(() => {
        this.props.history.push('/');
      })
  }

  render() {
    const { title, isLoggedIn, username } = this.props;

    return (
      <div className="header">
        <div className="headerWrap">
          {/* <div onClick={this.props.selectNav} className="linkwrap"> */}
          <div className="titleWrap">
            <div className="selectWrap" onClick={this.props.selectNav}>
              <Link to="/" >
                <div className="logo">
                  {/* <img src="" alt="" srcSet=""/> */}
                  {/* use a blank square for now */}
                  <div className="placeholderLogo"></div>
                </div>
                <div className="title">{title}</div>
              </Link>
            </div>
          </div>
          {/* </div> */}

          <SearchBar />

          <div className="loginStatusWrap">
            {isLoggedIn ?
              <div className="loginStatus">
                Welcome back, {username}! <span onClick={this.onLogout} className="refLogin">Logout</span>
              </div>
              :
              <div className="loginStatus">
                Need an account? <Link to="/login" className="refLogin">
                  Log in here.
              </Link>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    logout: user => {
      return dispatch(logout(user))
    }
  }
}
Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default withRouter(Header);

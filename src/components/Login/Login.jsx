import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from '../../actions';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInput: '',
      passwordInput: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;

    switch (e.target.name) {
      case 'username':
        this.setState({ userInput: value })
        break;
      case 'password':
        this.setState({ passwordInput: value })
        break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = {};
    user.username = this.state.userInput;
    user.password = this.state.passwordInput;

    this.props.login(user)
      .then(() => {
        this.props.history.push('/');
      })
    this.setState({
      userInput: '',
      passwordInput: ''
    })
  }

  render() {
    return (
      <div className="loginContainer">
        <div className="titleContainer">
          <h1 className="title">Login:</h1>
        </div>
        <form>
          <div>
            <label name="username"> Username: </label>
            <input type="text" name="username" value={this.state.userInput} onChange={this.handleInputChange} />
          </div>
          <div>
            <label name="password">Password: </label>
            <input type="password" name="password" value={this.state.passwordInput} onChange={this.handleInputChange} />
          </div>
          <div className="btnContainer">
            <button className="btn" onClick={this.handleSubmit}>Login</button>
          </div>
          <div className="registerLink">
            <Link to='/register' className="link" >Need a Account?</Link>
          </div>
        </form>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    user: state.cmsReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => {
      return dispatch(login(user))
    }
  }
}

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default Login;
import React, { Component } from 'react';
import { connect } from "react-redux";
import { login } from '../../actions';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailInput: this.props.email,
      passwordInput: this.props.password,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;

    switch (e.target.name) {
      case 'email':
        this.setState({ emailInput: value })
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
    user.email = this.state.emailInput;
    user.password = this.state.passwordInput;

    this.props.login(user)
    this.setState({
      emailInput: '',
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
            <label name="email"> Email: </label>
            <input type="text" name="email" value={this.state.emailInput} onChange={this.handleInputChange} />
          </div>
          <div>
            <label name="password">Password: </label>
            <input type="password" name="password" value={this.state.passwordInput} onChange={this.handleInputChange} />
          </div>
          <div className="btnContainer">
            <button className="btn" onClick={this.handleSubmit}>Login</button>
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
      dispatch(login(user))
    }
  }
}

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default Login;
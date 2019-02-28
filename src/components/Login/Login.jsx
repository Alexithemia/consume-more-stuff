import React, { Component } from 'react';
import { connect } from "react-redux";

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

    const login = {};
    login.email = this.state.emailInput;
    login.password = this.state.passwordInput;
  }

  render() {
    return (
      <div className="loginContainer">
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

  }
}

const mapDispatchToProps = dispatch => {

}

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default Login;
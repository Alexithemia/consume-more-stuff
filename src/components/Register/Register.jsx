import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions';
import { Link } from "react-router-dom";
import './Register.scss';

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInput: '',
      emailInput: '',
      passwordInput: '',
      firstNameInput: '',
      lastNameInput: ''
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
      case 'email':
        this.setState({ emailInput: value })
        break;
      case 'password':
        this.setState({ passwordInput: value })
        break;
      case 'first_name':
        this.setState({ firstNameInput: value })
        break;
      case 'last_name':
        this.setState({ lastNameInput: value })
        break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = {};
    user.username = this.state.userInput;
    user.email = this.state.emailInput;
    user.password = this.state.passwordInput;
    user.first_name = this.state.firstNameInput;
    user.last_name = this.state.lastNameInput;

    this.props.register(user)
      .then(() => {
        this.props.history.push('/login')
      })

    this.setState({
      userInput: '',
      emailInput: '',
      passwordInput: '',
      firstNameInput: '',
      lastNameInput: ''
    })
  }

  render() {
    return (
      <div className="registerContainer">
        <div className="titleContainer">
          <h1 className="title">Register Here:</h1>
        </div>
        <form>
          <div>
            <label> Username: </label>
            <input type="text" name="username" value={this.state.userInput} onChange={this.handleInputChange} />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" name="password" value={this.state.passwordInput} onChange={this.handleInputChange} />
          </div>
          <div>
            <label> Email: </label>
            <input type="text" name="email" value={this.state.emailInput} onChange={this.handleInputChange} />
          </div>
          <div>
            <label> First Name: </label>
            <input type="text" name="first_name" value={this.state.firstNameInput} onChange={this.handleInputChange} />
          </div>
          <div>
            <label> Last Name: </label>
            <input type="text" name="last_name" value={this.state.lastNameInput} onChange={this.handleInputChange} />
          </div>

          <div className="btnContainer">
            <button className="btn" onClick={this.handleSubmit}>REGISTER</button>
          </div>
          
          <div className="loginLink">
            <Link to='/login' className="link" >Already have an account?</Link>
          </div>
        </form>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    register: user => {
      return dispatch(register(user))
    }
  }
}

Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);


export default Register
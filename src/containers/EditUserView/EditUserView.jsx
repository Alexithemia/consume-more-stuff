import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './EditUserView.scss';

import { loadUser, editUser } from '../../actions';

class EditUserView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      isUsernameInvalid: true
    };

    this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this);
    this.handleFirstNameOnChange = this.handleFirstNameOnChange.bind(this);
    this.handleLastNameOnChange = this.handleLastNameOnChange.bind(this);
    this.handleEmailOnChange = this.handleEmailOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    return this.props.loadUserData().then((data) => {
      this.setState({
        username: data.payload.username,
        first_name: data.payload.first_name,
        last_name: data.payload.last_name,
        email: data.payload.email,
        isUsernameInvalid: false
      })
    });
  }

  handleUsernameOnChange(e) {
    const value = e.target.value;

    this.setState({ username: value })
  }

  checkUsernameValid() {
    if (this.state.username.length < 2) {
      this.setState({ isUsernameInvalid: true })
    } else {
      this.setState({ isUsernameInvalid: false })
    }
  }

  handleFirstNameOnChange(e) {
    const value = e.target.value;

    this.setState({ first_name: value })
  }

  handleLastNameOnChange(e) {
    const value = e.target.value;

    this.setState({ last_name: value })
  }

  handleEmailOnChange(e) {
    const value = e.target.value;

    this.setState({ email: value })
  }

  handleOnSubmit(e) {
    e.preventDefault();

    const { username, first_name, last_name, email } = this.state;

    this.props.onEdit({
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email
    })
      .then(() => {
        this.props.history.push(`/`)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="form-wrap">
        <div className="input-wrap">
          <label >Username:</label>
          <input onChange={this.handleUsernameOnChange} onKeyUp={this.checkUsernameValid} type="text" value={this.state.username} />
          <label >First Name:</label>
          <input onChange={this.handleFirstNameOnChange} type="text" value={this.state.first_name} />
          <label >Last Name:</label>
          <input onChange={this.handleLastNameOnChange} type="text" value={this.state.last_name} />
          <label >Email:</label>
          <input onChange={this.handleEmailOnChange} type="text" value={this.state.email} />
        </div>
        <div className="submit-wrap">
          {this.state.isUsernameInvalid ?
            <input className="disabled" type="submit" value="SUBMIT" form="add-post-form" disabled />
            :
            <input onClick={this.handleOnSubmit} type="submit" value="SUBMIT EDIT" form="add-post-form" />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserData: () => {
      const actionObject = loadUser();

      return dispatch(actionObject);
    },
    onEdit: (editedUser) => {
      const actionObject = editUser(editedUser);

      return dispatch(actionObject);
    }
  };
}

EditUserView = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserView);

export default withRouter(EditUserView);

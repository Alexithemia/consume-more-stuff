import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../actions';
import './AdminUserView.scss';
import UserList from '../../components/UserList';

class AdminUserView extends Component {

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const users = this.props.users;

    return (
      <div className="mainContainer">
        <div className="div">
          <div className="titleContainer">
            <h1 className="title">List of Users</h1>
          </div>

          <div className="contentContainer">
            <div className="userContainer">
              <ol className="user-list">
                <li className="titleContainer">

                  <div className="contentTitle content-data">Users</div>
                  <div className="contentTitle content-data" >Items</div>
                  <div className="contentTitle content-data">Verified</div>
                  <div className="contentTitle content-data">Status</div>
                  <div className="contentTitle content-data">Created</div>
                </li>
                <UserList users={users}></UserList>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => {
      const actionObject = loadUsers();
      return dispatch(actionObject);
    }
  }
}

AdminUserView = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserView);

export default AdminUserView;
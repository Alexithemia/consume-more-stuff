import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MessagesView.scss';
import { loadUserMessages } from '../../actions';
import UserMessageList from '../../components/UserMessageList'

class MessagesView extends Component {

  componentWillMount() {
    this.props.loadYourMessages();
  }

  render() {
    return (
      <div className="messages-wrap">
        <UserMessageList userList={this.props.userMessages} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userMessages: state.userMessages
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadYourMessages: () => {
      const actionObject = loadUserMessages();
      return dispatch(actionObject);
    }
  };
}

MessagesView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesView);

export default MessagesView;

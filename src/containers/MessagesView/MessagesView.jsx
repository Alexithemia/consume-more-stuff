import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MessagesView.scss';
import { loadUserMessages, deleteThread } from '../../actions';
import UserMessageList from '../../components/UserMessageList'

class MessagesView extends Component {
  constructor(props) {
    super(props)

    this.deleteThread = this.deleteThread.bind(this);
  }

  componentWillMount() {
    this.props.loadYourMessages();
  }

  deleteThread(e) {
    this.props.onDeleteThread(e.target.dataset.userid)
  }

  render() {
    return (
      <div className="messages-wrap">
        <UserMessageList userList={this.props.userMessages} delete={this.deleteThread} />
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
    },
    onDeleteThread: (id) => {
      const actionObject = deleteThread(id);
      return dispatch(actionObject);
    },
  };
}

MessagesView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesView);

export default MessagesView;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MessagesFromUserView.scss';
import { loadMessages, sendMessage, deleteMessage } from '../../actions';
import Conversation from '../../components/Conversation'

class MessagesFromUserView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      body: ''
    };

    this.handleBodyOnChange = this.handleBodyOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentWillMount() {
    this.props.loadConversation(this.props.match.params.id);
  }

  handleBodyOnChange(e) {
    const value = e.target.value;

    this.setState({ body: value })
  }

  deleteMessage(e) {
    console.log(e.target);

    this.props.onDelete({
      messageId: e.target.dataset.messageid,
      id: parseInt(e.target.dataset.userid)
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.props);

    this.props.onSend({
      body: this.state.body,
      post_id: this.props.conversation[this.props.conversation.length - 1].post_id,
      to_user_id: this.props.match.params.id
    })

    this.setState({ body: '' })
  }

  render() {
    return (
      <div className="conversation-wrap">
        <Conversation conversation={this.props.conversation} userId={this.props.userId} delete={this.deleteMessage} />
        <form className="replyForm">
          <div>Reply</div>
          <textarea className="reply" onChange={this.handleBodyOnChange} name="body" cols="60" rows="10" value={this.state.body} autoFocus></textarea>
          <input type="submit" className="sendButton" onClick={this.handleSubmit} value="Send"></input>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conversation: state.conversation,
    userId: state.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadConversation: (id) => {
      const actionObject = loadMessages(id);
      return dispatch(actionObject);
    },
    onSend: (message) => {
      const actionObject = sendMessage(message);
      return dispatch(actionObject);
    },
    onDelete: (messageData) => {
      const actionObject = deleteMessage(messageData);
      return dispatch(actionObject);
    },
  };
}

MessagesFromUserView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesFromUserView);

export default MessagesFromUserView;

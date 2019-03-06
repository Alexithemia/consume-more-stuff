import React, { Component } from 'react';
import './ItemSendMessage.scss';
import { connect } from 'react-redux';
import { sendMessage } from '../../actions'

class ItemSendMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to_user_id: this.props.selectedPost.user_id,
      post_id: this.props.selectedPost.id,
      body: ''
    }

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  updateInput(e) {
    const value = e.target.value;
    const field = e.target.dataset.field;

    this.setState({ [field]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const close = this.props.toggleModal;
    const { to_user_id, post_id, body } = this.state;
    this.props.onSendMessage({
      to_user_id: to_user_id,
      post_id: post_id,
      body: body
    }).then(function () {
      close();
    })
  }

  render() {
    return (
      <div className="message-wrap">
        <div className="message-header-wrap">
          <div className="form-header-wrap">
            <div className="form-header">Send a Message: <span className="accent-text">Start a conversation.</span></div>
            <div className="text">Are you interested in purchasing this product? Let's talk!</div>
          </div>
        </div>
        <div className="messageDetails">
          <div className="detail">Message to: {this.props.selectedPost.user.username}</div>
          <div className="detail">Concerning: {this.props.selectedPost.title}</div>
        </div>
        <form id="form-message">
          <div className="form-comment">
            <span className="title">HOW'S IT GOING?</span>
            <textarea onChange={this.updateInput} data-field="body" value={this.state.body} name="comment" cols="30" rows="10" placeholder="Hey, I'm looking to buy your product. Where can we meet?"></textarea>
          </div>

          <div className="form-submit-options">
            <input onClick={this.handleSubmit} className="submit-send" type="submit" value="Send Message" />
          </div>
        </form>
        <button onClick={this.props.toggleModal} className="submit-close">Close</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPost: state.selectedPost,
    id: state.id,
    isAdmin: state.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSendMessage: (message) => {

      const actionObject = sendMessage(message);
      return dispatch(actionObject);
    }
  }
}

ItemSendMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemSendMessage);

export default ItemSendMessage;

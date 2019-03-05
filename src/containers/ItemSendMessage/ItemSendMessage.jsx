import React, { Component } from 'react';
import './ItemSendMessage.scss';

class ItemSendMessage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name : '',
      email : '',
      comment : ''
    }

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInput(e) {
    const value = e.target.value;
    const field = e.target.dataset.field;

    this.setState({ [field] : value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.toggleModal();
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

        <form id="form-message">
          <div className="form-name">
            <span className="title">NAME</span>
            <input onChange={ this.updateInput } data-field="name" type="text" value={ this.state.name } placeholder="Jane Doe" />
          </div>

          <div className="form-email">
            <span className="title">EMAIL</span>
            <input onChange={ this.updateInput } data-field="email" type="text" value={ this.state.email } placeholder="name@example.com" />
          </div>

          <div className="form-comment">
            <span className="title">HOW'S IT GOING?</span>
            <textarea onChange={ this.updateInput } data-field="comment" value={ this.state.comment } name="comment" cols="30" rows="10" placeholder="Hey, I'm looking to buy your product. Where can we meet?"></textarea>
          </div>

          <div className="form-submit-options">
            <input onClick={ this.handleSubmit } className="submit-send" type="submit" value="Send Message" />
            <button onClick={ this.props.toggleModal } className="submit-close">Close</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ItemSendMessage;

import React, { Component } from 'react';
import './ItemSendMessage.scss';

class ItemSendMessage extends Component {
  constructor (props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div className="message-wrap">
        <div className="message-header-wrap">
          <div className="form-header-wrap">
            <div className="form-header">Send a Message: <span className="accent-text">We hear you.</span></div>
            <div className="text">Are you interested in purchasing this product? Let's talk!</div>
          </div>
        </div>

        <form id="form-message">
          <div className="form-name">
            <span className="title">NAME</span>
            <input type="text" value={ this.state.name } placeholder="Jane Doe" />
          </div>

          <div className="form-email">
            <span className="title">EMAIL</span>
            <input type="text" value={ this.state.email } placeholder="name@example.com" />
          </div>

          <div className="form-comment">
            <span className="title">HOW'S IT GOING?</span>
            <textarea name="comment" cols="30" rows="10" placeholder="Hey, I'm looking to buy your product. Where can we meet?"></textarea>
          </div>

          <div className="form-submit-options">
            <input className="submit-send" type="submit" value="Send Message" />
            <button className="submit-close">Close</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ItemSendMessage;

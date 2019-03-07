import React from 'react';
import './ConversationMessage.scss'

const ConversationMessage = (props) => {
  const { id, from_user_id, created_at, body } = props.message;
  const { title } = props.message.post;

  return (
    <>
      {from_user_id === parseInt(props.userId) ?
        <div className="message yours">
          <div onClick={props.delete} className="deleteMessageButton" data-id={id}>X</div>
          <div className="messageHead">
            <div>TO: {props.message.toUser.username}</div>
            <div>Concerning Post: {title}</div>
          </div>
          <div className="sent">Sent: {created_at}</div>
          <div className="bodyWrap">Message:
          <div>{body}</div>
          </div>
        </div>
        :
        <div className="message">
          <div onClick={props.delete} className="deletePostButton" data-id={id}>X</div>
          <div className="messageHead">
            <div>TO: {props.message.toUser.username}</div>
            <div>Concerning Post: {title}</div>
          </div>
          <div className="sent">Sent: {created_at}</div>
          <div className="bodyWrap">Message:
          <div>{body}</div>
          </div>
        </div>
      }
    </>
  );
}

export default ConversationMessage;
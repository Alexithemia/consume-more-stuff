import React from 'react';
import ConversationMessage from '../ConversationMessage';

const Conversation = (props) => {
  const conversation = props.conversation.map(message => {
    return (
      <ConversationMessage key={message.id} message={message} userId={props.userId} />
    );
  });

  return (
    <>
      {conversation}
    </>
  );
}

export default Conversation;

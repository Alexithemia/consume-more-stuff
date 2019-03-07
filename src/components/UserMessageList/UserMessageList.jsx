import React from 'react';
import UserMessage from '../UserMessage';

const UserMessageList = (props) => {
  const userMessageList = props.userList.map(user => {
    return (
      <UserMessage key={user.from_user_id} id={user.from_user_id} created_at={user.created_at} username={user.username} unread={user.unread} />
    );
  });

  return (
    <>
      {userMessageList}
    </>
  );
}

export default UserMessageList;

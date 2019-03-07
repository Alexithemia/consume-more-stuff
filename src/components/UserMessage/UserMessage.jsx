import React from 'react';
import { Link } from "react-router-dom";
import './UserMessage.scss';

const UserMessage = (props) => {
  const { id, username, unread } = props;

  return (
    <>
      {unread ?
        <Link to={`/dashboard/messages/${id}`} className="userMessageWrap unread">
          <div>From: {username}</div>
          <div>Latest Message: {Date(props.created_at)}</div>
        </Link>
        :
        <Link to={`/dashboard/messages/${id}`} className="userMessageWrap">
          <div>From: {username}</div>
          <div>Latest Message: {Date(props.created_at)}</div>
        </Link>
      }

    </>
  );
}

export default UserMessage;
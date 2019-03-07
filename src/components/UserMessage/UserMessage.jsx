import React from 'react';
import { Link } from "react-router-dom";
import './UserMessage.scss';

const UserMessage = (props) => {
  const { id, username, unread } = props;
  return (
    <>
      {unread ?
        <div className="userMessageWrap unread">
          <div onClick={props.delete} className="deleteThreadBtn" data-userid={id}>X</div>
          <Link to={`/dashboard/messages/${id}`} className="userMessageDataWrap">
            <div>From: {username}</div>
            <div>Latest Message: {Date(props.created_at)}</div>
          </Link>
        </div>
        :
        <div className="userMessageWrap">
          <div onClick={props.delete} className="deleteThreadBtn">X</div>
          <Link to={`/dashboard/messages/${id}`} className="userMessageDataWrap">
            <div>From: {username}</div>
            <div>Latest Message: {Date(props.created_at)}</div>
          </Link>
        </div>
      }
    </>
  );
}

export default UserMessage;
import React from 'react';
import './UserPost.scss';

const UserPost = (props) => {
  const { id, description, dimensions, image, manufacturer, model, notes, postCondition, postStatus, price, title, created_at, updated_at, user, views } = props.postData;

  return (
    <div className="user-post">
      <br/>
      <div>{ title }</div>
      <div>{ price }</div>
      <div>{ description }</div>
      <div>{ postCondition.name }</div>
      <div>{ postStatus.name }</div>
      <div>{ user.first_name }</div>
      <div>{ user.last_name }</div>
      <div>{ views }</div>
      <br/>
    </div>
  );
}

export default UserPost;

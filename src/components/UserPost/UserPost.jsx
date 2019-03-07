import React from 'react';
import './UserPost.scss';

const UserPost = (props) => {
  const { id, description, dimensions, image, manufacturer, model, notes, postCondition, postStatus, price, title, created_at, updated_at, user, views } = props.postData;

  return (
    <div className="user-post">
      <div className="post-container">
        <div className="post-image-container">
          <img className="post-image" src="" alt="" />
        </div>

        <div className="post-data" id="post-title">{ title }</div>

        <div className="post-data">
          Price: $<span className="text-highlight">{ price }</span>
        </div>

        <div className="post-data">
          <span className="text-highlight">{ description }</span>
        </div>

        <div className="post-data">
          Condition: <span className="text-highlight">{ postCondition.name }</span>
        </div>

        <div className="post-data">
          Status: <span className="text-highlight">{ postStatus.name }</span>
        </div>

        <div className="post-data">
          By: <span className="text-highlight">{ user.first_name }{ user.last_name }</span>
        </div>

        <div className="post-data">
          Viewed: <span className="text-highlight">{ views } times</span>
        </div>

        <div className="post-data">
          Created: <span className="text-highlight">{ new Date(created_at).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }) }</span>
        </div>
      </div>
    </div>
  );
}

export default UserPost;

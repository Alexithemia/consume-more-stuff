import React from 'react';
import './UserPost.scss';

import { Link } from 'react-router-dom';

const UserPost = (props) => {
  const { id, description, dimensions, image, manufacturer, model, notes, postCondition, postStatus, price, title, created_at, updated_at, user, views } = props.postData;

  console.log(image);

  return (
    <div className="user-post">
      <div className="post-container">
        <Link to={ `/item/${ id }` } className="post-image-container">
          <img
            src={
              image.length === 0 ? 'https://i.imgur.com/IeBLmWd.png'
              :
              null
            }
            alt=""
          />
        </Link>

        <div className="content">
          <Link to={ `/item/${ id }` } className="post-data" id="post-title">{ title }</Link>

          <div className="post-data">
            <span className="text-highlight">{ description }</span>
          </div>

          { notes ?
              <div className="post-data">
                Notes: <span className="text-highlight">{ notes }</span>
              </div>
            :
              null
          }

          <div className="post-data">
            Price: <span className="text-highlight">${ price }</span>
          </div>

          <div className="post-data">
            Condition: <span className="text-highlight">{ postCondition.name }</span>
          </div>

          <div className="post-data">
            Status: <span className="text-highlight">{ postStatus.name }</span>
          </div>

          { dimensions ? 
              <div className="post-data">
                Dimensions: <span className="text-highlight">{ dimensions }</span>
              </div>
            :
              null
          }

          { manufacturer ?
              <div className="post-data">
                Manufacturer: <span className="text-highlight">{ manufacturer }</span>
              </div>
            :
              null
          }

          { model ?
              <div className="post-data">
                Model: <span className="text-highlight">{ model }</span>
              </div>
            :
              null
          }

          <div className="post-data">
            By: <span className="text-highlight">{ user.first_name } { user.last_name }</span>
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
    </div>
  );
}

export default UserPost;

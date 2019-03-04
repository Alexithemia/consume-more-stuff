import React from 'react';
import './Post.scss';
import { Link } from "react-router-dom";

const Post = (props) => {
  let date = new Date(props.postData.created_at)

  return (
    <Link to={`/item/${props.postData.id}`} className="postContainer">
      <div className="imgContainer">
        {props.postData.image[0] ?
          <img src={props.postData.image[0].url} alt="" className="img" />
          :
          <img src="https://s3-us-west-2.amazonaws.com/alexithemia-cms-imagestore/no-image.jpg" alt="" className="noImg" />
        }
      </div>
      <h2 className="title"> {props.postData.title} - {props.postData.postStatus.name}</h2>
      <div className="textContainer">
        <div className="price">${props.postData.price}</div>
        <div className="updatedAt">Posted: {date.toUTCString()}</div>
      </div>
      <div className="viewContainer">
        <div className="views">Views: {props.postData.views}</div>
      </div>
    </Link>
  )
}
export default Post;
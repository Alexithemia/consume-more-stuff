import React from 'react';
import './Post.scss';
import { Link } from "react-router-dom";

const Post = (props) => {
  let date = new Date(props.postData.updated_at)

  return (
    <Link to={`/item/${props.postData.id}`} className="postContainer">
      <img src={props.postData.image[0].url || "https://s3-us-west-2.amazonaws.com/alexithemia-cms-imagestore/no-image.jpg"} alt="" className="img" />
      <h2 className="title"> {props.postData.title} - {props.postData.postStatus.name}</h2>
      <div className="price">${props.postData.price}</div>
      <div className="updatedAt">{date.toUTCString()}</div>

    </Link>
  )
}
export default Post;
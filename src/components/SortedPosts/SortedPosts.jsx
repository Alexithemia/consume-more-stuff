import React from 'react';
import './SortedPosts.scss';

import UserPost from '../UserPost';

const SortedPosts = (props) => {
  const postList = props.posts.map(post => {
    const { id } = post;

    return (
      <UserPost key={id} postData={post} />
    );
  });

  return (
    <div className="sorted">

      <div className="section-title">{props.title}</div>

      {postList.length === 0 ?
        <div className="no-items">
          No items available.
        </div>
        :
        <div className="posts">
          {postList}
        </div>
      }
    </div>
  );
}

export default SortedPosts;

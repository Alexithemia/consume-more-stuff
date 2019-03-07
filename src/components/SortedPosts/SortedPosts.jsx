import React from 'react';
import './SortedPosts.scss';

import UserPost from '../UserPost';

const SortedPosts = (props) => {
  console.log('SortedPosts.props:'); console.log(props);
  const postList = props.posts.map(post => {
    const { id } = post;

    return (
      <UserPost key={ id } postData={ post }/>
    );
  });
  
  return (
    <div className="sorted">{ props.title }
      { postList }
    </div>
  );
}

export default SortedPosts;

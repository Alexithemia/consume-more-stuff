import React from 'react';
import Post from '../Post';

const PostList = (props) => {
  const postList = props.selectedCategory.map(post => {

    return (
      <Post key={post.id}
        postData={post}
      />
    )
  })

  return (
    <>
      {postList}
    </>
  )
}

export default PostList;
import React from 'react';
import Post from '../Post'

const PostList = (props) => {
  console.log(props)
  const postList = props.posts.map(post => {

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
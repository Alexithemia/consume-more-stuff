import React from 'react';
import Post from '../Post'

const TrendingList = (props) => {
  let count = 0;
  const trendingList = props.posts.map(post => {
    count++

    if (count <= 12) {
      return (
        <Post key={post.id}
          postData={post}
        />
      )
    } else {
      return null;
    }
  })
  return (
    <>
      {trendingList}
    </>
  )
}

export default TrendingList;
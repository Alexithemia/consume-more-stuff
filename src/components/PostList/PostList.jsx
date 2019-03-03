import React from 'react';
import Post from '../Post'

const TrendingList = (props) => {
  console.log(props)
  const trendingList = props.posts.map(post => {

    return (
      <Post key={post.id}
        postData={post}
      />

    )
  })

  return (
    <>
      {trendingList}
    </>
  )
}

export default TrendingList;
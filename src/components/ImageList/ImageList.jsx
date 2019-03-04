import React from 'react';
import Image from '../Image';

const ImageList = (props) => {

  const imageList = props.images.map(image => {
    return (
      <Image key={image.id}
        url={image.url}
        changePhoto={props.changePhoto}
      ></Image>
    )
  })

  return (
    <>
      {imageList}
    </>
  )
}

export default ImageList;
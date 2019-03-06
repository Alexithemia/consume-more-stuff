import React from 'react';
import EditImage from '../EditImage';
import './EditImageList.scss';

const EditImageList = (props) => {

  const editImageList = props.images.map(image => {
    return (
      <EditImage key={image.id}
        id={image.id}
        url={image.url}
        deleteImg={props.deleteImg}
      ></EditImage>
    )
  })

  return (
    <div className="editImgList">
      {editImageList}
    </div>
  )
}

export default EditImageList;
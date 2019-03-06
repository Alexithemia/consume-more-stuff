import React from 'react';
import './EditImage.scss';

const EditImage = (props) => {
  return (
    <div className="editImgBox">
      <img src={props.url} alt="" className="editImg" onClick={props.deleteImg} data-id={props.id} />
    </div>
  )
}

export default EditImage;
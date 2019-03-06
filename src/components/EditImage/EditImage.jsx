import React from 'react';
import './EditImage.scss';

const EditImage = (props) => {
  return (
    <img src={props.url} alt="" className="editImg" onClick={props.deleteImg} data-id={props.id} />
  )
}

export default EditImage;
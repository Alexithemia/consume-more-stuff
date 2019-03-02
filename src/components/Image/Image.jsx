import React from 'react';

const Image = (props) => {

  return (
    <img src={props.url} alt="" className="navImg" onClick={props.changePhoto} />
  )
}

export default Image;
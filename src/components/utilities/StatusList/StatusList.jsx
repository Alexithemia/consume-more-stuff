import React from 'react';
import Status from '../Status';

const StatusList = (props) => {
  const statusList = props.postStatuses.map(status => {
    return (
      <Status key={status.id} id={status.id} name={status.name} />
    );
  });

  return (
    <>
      {statusList}
    </>
  );
}

export default StatusList;

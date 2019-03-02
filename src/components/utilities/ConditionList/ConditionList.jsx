import React from 'react';
import Condition from '../Condition';

const ConditionList = (props) => {
  const conditionList = props.postConditions.map(condition => {
    return (
      <Condition key={ condition.id } id={ condition.id } name={ condition.name } />
    );
  });

  return (
    <>
      { conditionList }
    </>
  );
}

export default ConditionList;

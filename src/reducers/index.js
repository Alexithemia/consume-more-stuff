'use strict';
import { userActions } from '../actions';

const cmsReducer = (state = [], action) => {

  switch (action.type) {
    case userActions.login:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default cmsReducer;
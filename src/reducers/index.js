'use strict';
import { LOGIN_USER } from '../actions';

const initialState = {
  posts: [],
  categories: [],
  postConditions: [],
  messages: [],
  users: [],
  loggedIn: localStorage.getItem('loggedIn')
}

const cmsReducer = (state = [], action) => {

  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { loggedIn: true })
    default:
      return state;
  }
}

export default cmsReducer;
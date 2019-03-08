import { castStringToBool } from './helper'
import { LOGIN_USER, LOGOUT_USER, DELETE_THREAD, LOAD_CATEGORIES, LOAD_STATUSES, LOAD_CATEGORY, LOAD_CONDITIONS, LOAD_POSTS, LOAD_POST, SEARCH_POST, LOAD_USERMESSAGES, LOAD_CONVERSATION, SEND_MESSAGE, DELETE_MESSAGE, LOAD_USERS, LOAD_USER, LOAD_USER_POSTS } from '../actions';
const initialState = {
  posts: [],
  selectedPost: {},
  categories: [],
  selectedCategory: [],
  postConditions: [],
  postStatuses: [],
  messages: [],
  users: [],
  user: {},
  userMessages: [],
  conversation: [],
  username: localStorage.getItem('username'),
  loggedIn: localStorage.getItem('loggedIn'),
  id: parseInt(localStorage.getItem('id')),
  isAdmin: castStringToBool(localStorage.getItem('isadmin'))
}

const cmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { loggedIn: true, username: action.payload.username, id: action.payload.id, isAdmin: action.payload.is_admin });
    case LOGOUT_USER:
      return Object.assign({}, state, { loggedIn: false, username: '' });
    case LOAD_USER:
      return Object.assign({}, state, { user: action.payload });
    case LOAD_USERS:
      return Object.assign({}, state, { users: [...action.payload] });
    case LOAD_CATEGORIES:
      return Object.assign({}, state, { categories: [...action.payload] });
    case LOAD_CATEGORY:
      return Object.assign({}, state, { posts: [...action.payload] });
    case LOAD_CONDITIONS:
      return Object.assign({}, state, { postConditions: [...action.payload] });
    case LOAD_STATUSES:
      return Object.assign({}, state, { postStatuses: [...action.payload] });
    case LOAD_POSTS:
      return Object.assign({}, state, { posts: [...action.payload] });
    case LOAD_POST:
      return Object.assign({}, state, { selectedPost: action.payload });
    case SEARCH_POST:
      return Object.assign({}, state, { posts: [...action.payload] });
    case LOAD_USER_POSTS:
      return Object.assign({}, state, { posts: [...action.payload] });
    case LOAD_USERMESSAGES:
      return Object.assign({}, state, { userMessages: [...action.payload] });
    case LOAD_CONVERSATION:
      return Object.assign({}, state, { conversation: [...action.payload] });
    case SEND_MESSAGE:
      return Object.assign({}, state, { conversation: [...state.conversation, action.payload] });
    case DELETE_MESSAGE:
      return Object.assign({}, state, { conversation: [...action.payload] });
    case DELETE_THREAD:
      return Object.assign({}, state, { userMessages: [...action.payload] });
    default:
      return state;
  }
}

export default cmsReducer;
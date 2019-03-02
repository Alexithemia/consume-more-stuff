import { LOGIN_USER, LOGOUT_USER } from '../actions';
import { LOAD_CATEGORIES, LOAD_POSTS, LOAD_POST } from '../actions';

const initialState = {
  posts: [],
  categories: [],
  postConditions: [],
  messages: [],
  users: [],
  username: localStorage.getItem('username'),
  loggedIn: localStorage.getItem('loggedIn')
}


const cmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { loggedIn: true, username: action.payload.username });
    case LOGOUT_USER:
      return Object.assign({}, state, { loggedIn: false, username: '' });
    case LOAD_CATEGORIES:
      return Object.assign({}, state, { categories: [...state.categories, ...action.payload] });
    case LOAD_POSTS:
      return Object.assign({}, state, { posts: [...action.payload] });
    case LOAD_POST:
      return Object.assign({}, state, { posts: [...action.payload] })
    default:
      return state;
  }
}

export default cmsReducer;
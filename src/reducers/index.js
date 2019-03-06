import { LOGIN_USER, LOGOUT_USER, LOAD_USERS } from '../actions';
import { LOAD_CATEGORIES, LOAD_CATEGORY, LOAD_CONDITIONS, ADD_POST, LOAD_POSTS, LOAD_POST, SEARCH_POST } from '../actions';


const initialState = {
  posts: [],
  selectedPost: {},
  categories: [],
  selectedCategory: [],
  postConditions: [],
  messages: [],
  users: [],
  username: localStorage.getItem('username'),
  loggedIn: localStorage.getItem('loggedIn'),
  id: parseInt(localStorage.getItem('id')),
  isAdmin: localStorage.getItem('isadmin')
}


const cmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { loggedIn: true, username: action.payload.username, id: action.payload.id, isAdmin: action.payload.is_admin });
    case LOGOUT_USER:
      return Object.assign({}, state, { loggedIn: false, username: '' });
    case LOAD_USERS:
      return Object.assign({}, state, { users: [...action.payload] });
    case LOAD_CATEGORIES:
      return Object.assign({}, state, { categories: [...state.categories, ...action.payload] });
    case LOAD_CATEGORY:
      return Object.assign({}, state, { selectedCategory: [...action.payload] });
    case LOAD_CONDITIONS:
      return Object.assign({}, state, { postConditions: [...state.postConditions, ...action.payload] });
    case ADD_POST:
      return Object.assign({}, state, { posts: [...state.posts, action.payload] });
    case LOAD_POSTS:
      return Object.assign({}, state, { posts: [...state.posts, ...action.payload] });
    case LOAD_POST:
      return Object.assign({}, state, { selectedPost: action.payload });
    case SEARCH_POST:
      return Object.assign({}, state, { posts: [...action.payload] });
    default:
      return state;
  }
}

export default cmsReducer;
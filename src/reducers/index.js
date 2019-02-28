import { LOGIN_USER } from '../actions';
import { LOAD_CATEGORIES } from '../actions';

const initialState = {
  posts: [],
  categories: [],
  postConditions: [],
  messages: [],
  users: [],
  username : '',
  loggedIn: localStorage.getItem('loggedIn')
}

const cmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { loggedIn: true });
    case LOAD_CATEGORIES:
      return Object.assign({}, state, { categories : [...state.categories, ...action.payload] });
    default:
      return state;
  }
}

export default cmsReducer;
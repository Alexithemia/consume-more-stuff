import { LOAD_CATEGORIES } from '../actions';

const dummyData = {
  categories : [],
  username : 'Zeke',
  isLoggedIn : true
}

const categoryReducer = (state = dummyData, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      // return [...state.categories, action.payload];
      return Object.assign({}, state, { categories : [...state.categories, ...action.payload] });
    default:
      return state;
  }
}

export default categoryReducer;

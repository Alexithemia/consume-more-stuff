import { LOAD_CATEGORIES } from '../actions';

const dummyData = {
  categories : [
    { id : 1, name : 'Vehicles' },
    { id : 2, name : 'Computers' },
    { id : 3, name : 'Appliances' },
    { id : 4, name : 'Pet Products' },
    { id : 5, name : 'Health' }
  ],
  isLoggedIn : false
}

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default categoryReducer;

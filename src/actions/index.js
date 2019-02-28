/**
 * Actions
 */

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

/**
 * Action Creators
 */

export const loadCategories = () => {
  return (dispatch) => {
    return  dispatch({
      type : LOAD_CATEGORIES,
      payload : [
        { id : 1, name : 'Vehicles' },
        { id : 2, name : 'Computers' },
        { id : 3, name : 'Appliances' },
        { id : 4, name : 'Pet Products' },
        { id : 5, name : 'Health' }
      ]
    });
  }
}

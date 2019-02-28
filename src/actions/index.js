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
      payload : dummyData.categories
    });
  }
}

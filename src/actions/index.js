/** Actions */

export const LOGIN_USER = 'LOGIN_USER';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

/** Action Creators*/

export const login = (user) => {
  return (dispatch) => {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((user) => {
        localStorage.setItem('loggedIn', true)
        return dispatch({
          type: LOGIN_USER,
          payload: user
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

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
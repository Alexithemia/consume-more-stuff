'use strict';

/** Actions */

export const userActions = {
  login,
  logout,
  register
}

/** Action Creators*/

export const login = (user) => {
  return (dispatch) => {
    return fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((response) => {
        return response.json()
      })
      .then((user) => {
        return dispatch({
          type: LOGIN_USER,
          payload: user
        })
      })
  }
}
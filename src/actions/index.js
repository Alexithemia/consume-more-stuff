
/** Actions */

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_CONDITIONS = 'LOAD_CONDITIONS';
export const ADD_POST = 'ADD_POST';

/** Action Creators*/

export const register = (user) => {
  return (dispatch) => {
    return fetch('/api/register', {
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
        return dispatch({
          type: REGISTER_USER,
          payload: user
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

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
        localStorage.setItem('username', user.username)
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

export const logout = () => {
  return (dispatch) => {
    return fetch('/api/logout', {
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((user) => {
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('username')
        return dispatch({
          type: LOGOUT_USER,
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
    return fetch('/api/category')
      .then(response => {
        return response.json();
      })
      .then(body => {
        return dispatch({
          type: LOAD_CATEGORIES,
          payload: body
        });
      });
  }
}

export const loadConditions = () => {
  return (dispatch) => {
    return fetch('/api/posts/condition')
      .then(response => {
        return response.json();
      })
      .then(body => {
        return dispatch({
          type: LOAD_CONDITIONS,
          payload: body
        });
      });
  }
}

export const addPost = (newPost) => {
  return (dispatch) => {
    const formData = new FormData();

    for (let key in newPost) {
      formData.append(key, newPost[key])
    }
    for (let i = 0; i < newPost.photos.length; i++) {
      formData.append('photos', newPost.photos[i]);
    }


    return fetch('api/posts', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        dispatch({
          type: ADD_POST,
          payload: body
        });
      });
  }
}
/** Actions */

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOAD_USERS = 'LOAD_USER';
export const LOAD_CATEGORY = 'LOAD_CATEGORY';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_CONDITIONS = 'LOAD_CONDITIONS';
export const LOAD_STATUSES = 'LOAD_STATUSES';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POST = 'LOAD_POST';
export const SEARCH_POST = 'SEARCH_POST';
export const LOAD_USER_POSTS = 'LOAD_USER_POSTS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const LOAD_USERMESSAGES = 'LOAD_USERMESSAGES';
export const LOAD_CONVERSATION = 'LOAD_CONVERSATION';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const DELETE_THREAD = 'DELETE_THREAD';
export const LOAD_USER = 'LOAD_USER';
export const EDIT_USER = 'EDIT_USER';

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
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', user.username);
        localStorage.setItem('id', user.id);
        localStorage.setItem('isadmin', user.is_admin);
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
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        localStorage.removeItem('isadmin');
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

export const loadUsers = () => {

  return (dispatch) => {
    return fetch('/api/users/all')
      .then(response => {
        return response.json();
      })
      .then(user => {
        return dispatch({
          type: LOAD_USERS,
          payload: user.users
        });
      });
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

export const loadCategory = (id) => {
  return (dispatch) => {
    return fetch(`/api/category/${id}`, {
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((body) => {
        return dispatch({
          type: LOAD_CATEGORY,
          payload: body
        })
      })
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

export const loadStatuses = () => {
  return (dispatch) => {
    return fetch('/api/posts/status')
      .then(response => {
        return response.json();
      })
      .then(body => {
        return dispatch({
          type: LOAD_STATUSES,
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



    return fetch('/api/posts', {
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

export const editPost = (newPost) => {
  return (dispatch) => {
    const formData = new FormData();

    for (let key in newPost) {
      formData.append(key, newPost[key])
    }
    for (let i = 0; i < newPost.photos.length; i++) {
      formData.append('photos', newPost.photos[i]);
    }
    for (let i = 0; i < newPost.deleteImages.length; i++) {
      formData.append('delete', newPost.deleteImages[i]);
    }


    return fetch(`/api/posts/${newPost.id}`, {
      method: 'PUT',
      body: formData
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        dispatch({
          type: EDIT_POST,
          payload: body
        });
      });
  }
}

export const deletePost = (id) => {
  return (dispatch) => {
    return fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((body) => {
        return dispatch({
          type: DELETE_POST,
          payload: body
        })
      })
  }
}

export const loadPosts = () => {
  return (dispatch) => {
    return fetch('/api/posts', {
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((body) => {
        return dispatch({
          type: LOAD_POSTS,
          payload: body
        });
      });
  }
}

export const loadPost = (id) => {
  return (dispatch) => {
    return fetch(`/api/posts/${id}`, {
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((post) => {
        return dispatch({
          type: LOAD_POST,
          payload: post
        });
      });
  }
}

export const searchPost = (term) => {
  return (dispatch) => {
    return fetch(`/api/posts/search/${term}`, {
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then((posts) => {
        return dispatch({
          type: SEARCH_POST,
          payload: posts
        });
      });
  }
}

export const loadUserPosts = () => {
  return (dispatch) => {
    return fetch(`/api/posts/user-posts`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then(posts => {
        return dispatch({
          type : LOAD_USER_POSTS,
          payload : posts
        });
      });
  }
}

export const sendMessage = (message) => {
  return (dispatch) => {
    return fetch(`/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((response) => {
        return dispatch({
          type: SEND_MESSAGE,
          payload: response.message
        })
      })
  }
}

export const loadUserMessages = () => {
  return (dispatch) => {
    return fetch(`/api/messages`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((messages) => {
        return dispatch({
          type: LOAD_USERMESSAGES,
          payload: messages
        })
      })
  }
}

export const loadMessages = (id) => {
  return (dispatch) => {
    return fetch(`/api/messages/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((messages) => {
        return dispatch({
          type: LOAD_CONVERSATION,
          payload: messages
        })
      })
  }
}

export const deleteMessage = (messageData) => {
  return (dispatch) => {
    return fetch(`/api/messages/delete/${messageData.messageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((messages) => {
        return dispatch({

          type: DELETE_MESSAGE,
          payload: messages
        })
      })
  }
}

export const deleteThread = (id) => {
  return (dispatch) => {
    return fetch(`/api/messages/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((messages) => {
        return dispatch({
          type: DELETE_THREAD,
          payload: messages
        })
      })
  }
}

export const loadUser = () => {
  return (dispatch) => {
    return fetch(`/api/users`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((user) => {
        return dispatch({
          type: LOAD_USER,
          payload: user
        })
      })
  }
}

export const editUser = (editedUser) => {
  return (dispatch) => {
    return fetch(`/api/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedUser)
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((user) => {
        return dispatch({
          type: EDIT_USER,
          payload: user
        })
      })
  }
}

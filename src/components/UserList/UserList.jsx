import React from 'react';

const UserList = (props) => {
  const userList = props.users.map((users) => {
    let date = new Date(users.created_at)

    return (
      <li key={users.id} className="numbered-list-users">
        <div className="content-data">{users.username}
          <button className="msg">msg</button>
        </div>
        <div className="content-data">{users.postByUser.length}</div>
        <div className="content-data">{users.verified ? "true" : "false"}</div>
        <div className="content-data">{users.status.name}
          <button className="block">block</button>
        </div>
        <div className="content-data">{date.toUTCString()}</div>

      </li>
    )
  })
  return (
    <>
      {userList}
    </>
  )
}
export default UserList;
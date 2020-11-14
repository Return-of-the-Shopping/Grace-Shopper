import React from 'react'

const UserLine = props => {
  const user = props.user
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
    </tr>
  )
}

export default UserLine

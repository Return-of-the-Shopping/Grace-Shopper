import React from 'react'
import {Link} from 'react-router-dom'

const UserLine = props => {
  const user = props.user
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.id}</Link>
      </td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
    </tr>
  )
}

export default UserLine

import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

const UserLine = props => {
  const user = props.user
  let userName = `${user.firstName} ${user.lastName}`
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.id}</Link>
      </td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
      {props.toggleDelete && (
        <td className="user-delete">
          <Button
            variant="danger"
            size="sm"
            onClick={() => props.handleDelete(user.id, userName)}
          >
            Delete
          </Button>
        </td>
      )}
    </tr>
  )
}

export default UserLine

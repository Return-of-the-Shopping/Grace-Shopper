import React from 'react'
import {Link} from 'react-router-dom'

const AdminUserTools = props => {
  return (
    <div className="product-util">
      <div className="util-right">
        <a onClick={props.toggleDelete}>Quick Delete</a>
        <a onClick={props.toggleEdit}>Edit User</a>
        <a onClick={props.handleDelete}>Delete User</a>
      </div>
    </div>
  )
}

export default AdminUserTools

import React from 'react'
import {Link} from 'react-router-dom'

const AdminUserTools = props => {
  return (
    <div className={props.success ? 'product-util success' : 'product-util'}>
      <div className="util-center">{props.success && props.success}</div>
      <div className="util-right">
        {props.toggleDelete && (
          <Link to="#" onClick={props.toggleDelete}>
            Quick Delete
          </Link>
        )}
        {props.toggleDelete && (
          <Link to="#" onClick={props.toggleEdit}>
            Edit User
          </Link>
        )}
        {props.toggleDelete && (
          <Link to="#" onClick={props.handleDelete}>
            Delete User
          </Link>
        )}
      </div>
    </div>
  )
}

export default AdminUserTools

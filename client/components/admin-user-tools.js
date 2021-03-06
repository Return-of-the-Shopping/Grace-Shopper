import React from 'react'
import {Link} from 'react-router-dom'

const AdminUserTools = props => {
  return (
    <div className="product-util">
      <div className="util-right">
        {props.toggleDelete && (
          <Link to="#" onClick={props.toggleDelete}>
            Quick Delete
          </Link>
        )}
        {props.toggleEdit && (
          <Link to="#" onClick={props.toggleEdit}>
            {!props.toggleState ? 'Edit User' : 'Cancel Changes'}
          </Link>
        )}

        {props.handleDelete && (
          <Link to="#" onClick={props.handleDelete}>
            Delete User
          </Link>
        )}
      </div>
    </div>
  )
}

export default AdminUserTools

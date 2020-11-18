import React from 'react'
import {Link} from 'react-router-dom'

const AdminTools = props => {
  return (
    <div className="product-util">
      <div className="util-right">
        <Link to="/add-product">Add New Product</Link>
        {props.toggleDelete && (
          <Link to="#" onClick={props.toggleDelete}>
            Quick Delete
          </Link>
        )}
        {props.toggleEdit && (
          <Link to="#" onClick={props.toggleEdit}>
            Edit Product
          </Link>
        )}
        {props.handleDelete && (
          <Link to="#" onClick={props.handleDelete}>
            Delete Product
          </Link>
        )}
      </div>
    </div>
  )
}

export default AdminTools

import React from 'react'
import {Link} from 'react-router-dom'

const AdminTools = props => {
  return (
    <div className="product-util">
      <div className="util-right">
        <Link to="/add-product">Add New Product</Link>
        <a onClick={props.toggleDelete}>Quick Delete</a>
        <a onClick={props.toggleEdit}>Edit Product</a>
        <a onClick={props.handleDelete}>Delete Product</a>
      </div>
    </div>
  )
}

export default AdminTools

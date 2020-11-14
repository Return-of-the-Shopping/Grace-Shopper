import React from 'react'

import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {product} = props
  return (
    <Card style={{width: '18rem'}} className="card">
      <Card.Img variant="top" src={product.imageUrl} />
      <Card.Body className="card-body">
        <Card.Title className="card-title">{product.name}</Card.Title>
        <Link to={`/products/${product.id}`}>View</Link>
      </Card.Body>
    </Card>
  )
}

export default ProductCard

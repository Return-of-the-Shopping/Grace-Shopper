import React from 'react'

import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {product} = props
  return (
    <Card style={{width: '18rem'}} className="card">
      <Card.Img variant="top" src={product.imageUrl} />
      <Card.Body className="card-body">
        <Card.Title className="card-title">{product.name}</Card.Title>
        <Link to={`/products/${product.id}`}>View</Link>
        {props.toggleDelete && (
          <Button onClick={() => props.handleDelete(product.id)}>
            Delete Product
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductCard

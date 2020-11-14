import React from 'react'
import {ListGroup, Image, InputGroup, Button} from 'react-bootstrap'

const ProductLine = props => {
  const product = props.product
  return (
    <ListGroup horizontal>
      <Image src={product.imageUrl} thumbnail />
      <ListGroup.Item>{product.name}</ListGroup.Item>
      <ListGroup.Item>{`$` + product.price}</ListGroup.Item>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button
            variant="outline-secondary"
            onClick={event => console.log(product.quantity)}
          >
            -
          </Button>
        </InputGroup.Prepend>
        <ListGroup.Item>{product.quantity}</ListGroup.Item>
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={event => {
              let addQuant = (product.quantity += 1)
              console.log(addQuant)
            }}
          >
            +
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {/* <ListGroup.Item>{product.quantity}</ListGroup.Item> */}
      <ListGroup.Item>{`$` + product.price * product.quantity}</ListGroup.Item>
    </ListGroup>
  )
}

export default ProductLine

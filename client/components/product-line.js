import React from 'react'
import {ListGroup, Image, InputGroup, Button} from 'react-bootstrap'

class ProductLine extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
      update: false
    }

    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate() {
    const product = this.props.product

    if (!this.state.update) {
      this.setState({
        quantity: product.quantity,
        update: true
      })
    }
  }

  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   })
  // }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    const product = this.props.product
    const info = this.props.info
    console.log(this.state.quantity)
    return (
      <ListGroup horizontal>
        <Image src={product.imageUrl} thumbnail />
        <ListGroup.Item>{product.name}</ListGroup.Item>
        <ListGroup.Item>{`$` + product.price}</ListGroup.Item>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button
              variant="outline-secondary"
              onClick={() => {
                let reduceQuant = (product.quantity -= 1)
                this.setState({quantity: reduceQuant})
              }}
            >
              -
            </Button>
          </InputGroup.Prepend>
          <ListGroup.Item>{this.state.quantity}</ListGroup.Item>
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => {
                let addQuant = (product.quantity += 1)
                this.setState({quantity: addQuant})
              }}
            >
              +
            </Button>
          </InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={event => {
              event.preventDefault()
              info.quantity = this.state.quantity
              const change = {...product, quantity: info.quantity}
              if (info.quantity <= 0) {
                this.props.cart.removeItem(info.productId)
              } else {
                this.props.cart.setItem(info.productId, JSON.stringify(change))
              }
              this.props.editCart(info)
            }}
          >
            update
          </Button>
        </InputGroup>
        {/* <ListGroup.Item>{product.quantity}</ListGroup.Item> */}
        <ListGroup.Item>
          {`$` + product.price * this.state.quantity}
        </ListGroup.Item>
      </ListGroup>
    )
  }
}

export default ProductLine

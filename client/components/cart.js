import React from 'react'
import {ListGroup, Image} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(1)
  }
  render() {
    let product = this.props.product || {}
    return (
      <ListGroup horizontal>
        <Image src={product.imageUrl} thumbnail />
        <ListGroup.Item>{product.name}</ListGroup.Item>
        <ListGroup.Item>{`$` + product.price}</ListGroup.Item>
        <ListGroup.Item>{product.quantity}</ListGroup.Item>
        <ListGroup.Item>
          {`$` + product.price * product.quantity}
        </ListGroup.Item>
      </ListGroup>
    )
  }
}

// dummy data
const mapState = state => {
  return {
    product: state.singleProduct
  }
}

// dummy data
const mapDispatach = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatach)(Cart)

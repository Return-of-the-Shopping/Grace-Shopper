import React from 'react'
import {connect} from 'react-redux'
import {
  fetchSingleProduct,
  updateSingleProduct,
  putToCart
} from '../store/singleProduct'
import {Button, InputGroup, FormControl} from 'react-bootstrap'
import cart from '../cart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId)
  }

  handleClick(product, user) {
    const checkoutInfo = {
      name: product.name,
      price: product.price,
      quantity: this.state.quantity,
      imageUrl: product.imageUrl
    }
    cart.setItem(product.id, JSON.stringify(checkoutInfo))
    const info = {
      productId: product.id,
      userId: user.id,
      price: product.price,
      quantity: this.state.quantity
    }
    this.props.addToCart(info)
  }

  render() {
    const {product, user} = this.props
    console.log(user)

    return (
      <div>
        It took you here.
        <h1>{product.name}</h1>
        <p>{product.price}</p>
        <p>{product.quantity}</p>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button
              variant="outline-secondary"
              onClick={() => this.setState({quantity: this.state.quantity - 1})}
            >
              -
            </Button>
          </InputGroup.Prepend>
          <FormControl
            aria-describedby="basic-addon1"
            value={this.state.quantity}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => this.setState({quantity: this.state.quantity + 1})}
            >
              +
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Button
          onClick={() => this.handleClick(product, user)}
          size="lg"
          disabled={!product.quantity}
        >
          {!product.quantity ? 'SOLD OUT' : 'Add to Cart'}
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchSingleProduct(productId)),
    updateProduct: (productId, update) =>
      dispatch(updateSingleProduct(productId, update)),
    addToCart: info => dispatch(putToCart(info))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

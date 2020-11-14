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
      <div className="product-container">
        <div className="product-container-left">
          {product.imageUrl && <img src={product.imageUrl} />}
        </div>

        <div className="product-container-right">
          <h1>{product.name}</h1>
          <h2>{product.abv}%</h2>
          <hr />
          <h6>Product Description:</h6>
          <p>{product.description}</p>
          <h3>${(product.price / 100).toFixed(2)}</h3>
          {product.quantity && (
            <div>
              <i>{product.quantity} in stock</i>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      this.setState({quantity: this.state.quantity - 1})
                    }
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
                    onClick={() =>
                      this.setState({quantity: this.state.quantity + 1})
                    }
                  >
                    +
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          )}
          <Button
            onClick={() => this.handleClick(product, user)}
            size="lg"
            disabled={!product.quantity}
          >
            {!product.quantity ? 'SOLD OUT' : 'Add to Cart'}
          </Button>
        </div>
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

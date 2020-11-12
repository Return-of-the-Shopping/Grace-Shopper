import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, updateSingleProduct} from '../store/singleProduct'
import {Button, InputGroup, FormControl} from 'react-bootstrap'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId)
  }

  render() {
    const {product} = this.props

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
        <Button size="lg" disabled={!product.quantity}>
          {!product.quantity ? 'SOLD OUT' : 'Add to Cart'}
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchSingleProduct(productId)),
    updateProduct: (productId, update) =>
      dispatch(updateSingleProduct(productId, update))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, updateSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId)
  }

  render() {
    const {product} = this.props

    return (
      <div>
        It took you here.
        <p>{product.name}</p>
        <p>{product.price}</p>
        <p>{product.quantity}</p>
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

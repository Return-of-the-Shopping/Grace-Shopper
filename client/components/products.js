import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class Products extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props

    return (
      <div>
        {products.map(product => <div key={product.id}>{product.name}</div>)}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(Products)

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  addProductToServer,
  deleteProductFromServer,
  fetchProducts
} from '../store/products'
import {ProductCard} from '../components'

class Products extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props
    return (
      <div>
        <div className="product-util">
          <Link to="/create">Add New Product</Link>
        </div>
        <div className="card-container">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
    fetchProducts: () => dispatch(fetchProducts()),
    addProduct: product => dispatch(addProductToServer(product)),
    deleteProduct: productId => dispatch(deleteProductFromServer(productId))
  }
}

export default connect(mapState, mapDispatch)(Products)

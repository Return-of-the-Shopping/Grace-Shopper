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
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }

  handleDelete(productId) {
    this.props.deleteProduct(productId)
  }

  render() {
    const {products} = this.props
    return (
      <div>
        <div className="product-util">
          <div className="util-right">
            <Link to="/create">Add New Product</Link>
          </div>
        </div>
        <div className="card-container">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              handleDelete={this.handleDelete}
            />
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

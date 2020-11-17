import React from 'react'
import {connect} from 'react-redux'
import {
  addProductToServer,
  deleteProductFromServer,
  fetchProducts
} from '../store/products'
import {ProductCard, AdminTools} from '../components'
import {toast} from 'react-toastify'

class Products extends React.Component {
  constructor() {
    super()
    this.state = {
      toggleDelete: false
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleDelete(productId, productName) {
    this.props.deleteProduct(productId)
    toast(`Deleted ${productName} from Database!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      progressStyle: {backgroundColor: '#4caf50'}
    })
  }

  toggleDelete() {
    console.log(this.state.toggleDelete)
    this.setState(state => ({
      toggleDelete: !state.toggleDelete
    }))
  }

  render() {
    const {products} = this.props
    return (
      <div>
        {this.props.user.admin && (
          <AdminTools toggleDelete={this.toggleDelete} />
        )}
        <div className="card-container">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              toggleDelete={this.state.toggleDelete}
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
    products: state.products,
    user: state.user
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

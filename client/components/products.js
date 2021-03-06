import React from 'react'
import {connect} from 'react-redux'
import {
  addProductToServer,
  deleteProductFromServer,
  fetchProducts
} from '../store/products'
import {ProductCard, AdminTools, Loading} from '../components'
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
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      progressStyle: {backgroundColor: '#4caf50'}
    })
  }

  toggleDelete() {
    this.setState(state => ({
      toggleDelete: !state.toggleDelete
    }))
  }

  render() {
    const {products} = this.props
    if (this.props.loading) {
      return <Loading props="beer" />
    }

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
    products: state.products.all,
    loading: state.products.loading,
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

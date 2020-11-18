import React from 'react'
import {ProductForm} from '../components'
import {updateSingleProduct} from '../store/singleProduct'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      category: '',
      description: '',
      abv: '',
      imageUrl: '',
      price: '',
      quantity: '',
      error: null,
      validated: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const product = this.props.product
    this.setState({
      name: product.name || '',
      category: product.category || '',
      description: product.description || '',
      abv: product.abv || '',
      imageUrl: product.imageUrl || '',
      price: (product.price / 100).toFixed(2) || '',
      quantity: product.quantity || ''
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    const form = event.currentTarget

    event.preventDefault()
    if (form.checkValidity() === false) {
      this.setState({validated: true})
      event.stopPropagation()
    } else {
      try {
        this.setState({error: null})
        await this.props.updateProduct(this.props.product.id, this.state)
      } catch (error) {
        this.setState({error: error})
      }
      if (!this.state.error) {
        this.setState({
          error: null,
          validated: false
        })
        this.props.toggleEdit()
        toast(`Successfully Updated!`, {
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
    }
  }

  render() {
    return (
      <ProductForm
        for="update"
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        name={this.state.name}
        category={this.state.category}
        description={this.state.description}
        abv={this.state.abv}
        imageUrl={this.state.imageUrl}
        price={this.state.price}
        quantity={this.state.quantity}
        validated={this.state.validated}
        error={this.state.error}
      />
    )
  }
}

const mapDispatch = dispatch => ({
  updateProduct: (productId, info) =>
    dispatch(updateSingleProduct(productId, info))
})

export default connect(null, mapDispatch)(EditProduct)

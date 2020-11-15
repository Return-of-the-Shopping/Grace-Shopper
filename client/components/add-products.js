import React from 'react'
import ProductForm from './product-form'
import {connect} from 'react-redux'
import {addProductToServer} from '../store/products'

class AddProduct extends React.Component {
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
      validated: false,
      success: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      success: ''
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
        const res = await this.props.addProduct(this.state)
        console.log(res)
      } catch (error) {
        this.setState({error: error})
      }
      if (!this.state.error) {
        this.setState({
          name: '',
          category: '',
          description: '',
          abv: '',
          imageUrl: '',
          price: '',
          quantity: '',
          error: null,
          success: `Successfully added ${
            this.state.name
          } to our product database!`,
          validated: false
        })
      }
    }
  }

  render() {
    return (
      <ProductForm
        for="add"
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
        success={this.state.success}
      />
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addProduct: product => dispatch(addProductToServer(product))
  }
}

export default connect(null, mapDispatch)(AddProduct)

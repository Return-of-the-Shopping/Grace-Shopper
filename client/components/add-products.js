import React from 'react'
import ProductForm from './product-form'
import {connect} from 'react-redux'
import {addProductToServer} from '../store/products'
import {AdminTools} from '../components'
import {toast} from 'react-toastify'

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
      validated: false
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
      } catch (error) {
        this.setState({error: error})
      }
      if (!this.state.error) {
        toast(`Successfully added ${this.state.name} to database.`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined
        })
        this.setState(state => ({
          name: '',
          category: '',
          description: '',
          abv: '',
          imageUrl: '',
          price: '',
          quantity: '',
          error: null,
          validated: false
        }))
      }
    }
  }

  render() {
    return (
      <div>
        <AdminTools />
        <div className="product-container">
          <div className="product-container-left">
            <img src="https://www.ball.com/Ball/media/Ball/Global/Markets%20and%20Capabilities%20Images/Beverage-Can-Upright-and-Can-Side-340x430.jpg?ext=.jpg" />
          </div>
          <div className="product-container-right">
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
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addProduct: product => dispatch(addProductToServer(product))
  }
}

export default connect(null, mapDispatch)(AddProduct)

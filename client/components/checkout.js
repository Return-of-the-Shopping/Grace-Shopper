import React from 'react'
import {connect} from 'react-redux'
import {Form, InputGroup, Button} from 'react-bootstrap'
import cart from '../cart'
import {updateSingleProduct} from '../store/singleProduct'
import {cartCheckout} from '../store/cart'
import history from '../history'

import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from './checkout-form'
import {stripeKeyPk} from '../../secrets'

const stripePK = process.env.STRIPE_PK || stripeKeyPk

const stripePromise = loadStripe(stripePK)

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      payment: '',
      validated: false,
      update: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    const user = this.props.user
    this.setState({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      zipcode: user.zipcode || '',
      payment: user.payment || '',
      validated: false
    })
  }

  componentDidUpdate() {
    const user = this.props.user
    if (!this.state.update && user.firstName) {
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        city: user.city,
        state: user.state,
        zipcode: user.zipcode,
        payment: user.payment,
        validated: false,
        update: true
      })
    }
  }

  handleSubmit = async event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      // event.preventDefault()
      event.stopPropagation()
    } else {
      // we need to find order as productOrders uses orderId to query db
      // const order = await this.props.
      // const productOrders = await axios.get(`/orders/${}`)
      // Object.keys(cart).map(async (productId) => {
      //   const product =
      //   await this.props.updateSingleProduct(productId, {quantity: })
      // })
      const info = {userId: this.props.user.id, cart}
      // set order fuilfilled to true in backend
      await this.props.cartCheckout(info)
      // await this.props.cartCheckout(this.props.user.id)
      // clear localStorage
      cart.clear()
    }
    this.setState({validated: true})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="product-container">
        <div className="product-container-left">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              cart={cart}
              user={this.state}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              // handleCheckout={this.handleCheckout}
            />
          </Elements>
        </div>
        <div className="product-container-right">
          <div>
            Order Total:{' '}
            {(
              Object.keys(cart).reduce(
                (orderTotal, productId) =>
                  orderTotal +
                  JSON.parse(cart[productId]).price *
                    JSON.parse(cart[productId]).quantity,
                0
              ) / 100
            ).toFixed(2)}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateSingleProduct: (productId, update) =>
      dispatch(updateSingleProduct(productId, update)),
    cartCheckout: userId => dispatch(cartCheckout(userId))
  }
}

export default connect(mapState, mapDispatch)(Checkout)

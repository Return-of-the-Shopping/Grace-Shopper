import React from 'react'
import {connect} from 'react-redux'
import cart from '../cart'
import {updateSingleProduct} from '../store/singleProduct'
import {cartCheckout} from '../store/cart'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from './checkout-form'
import {stripeKeyPk} from '../../secrets'
import {Table} from 'react-bootstrap'
import {ProductLine} from '../components'
import history from '../history'

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
      update: false,
      error: false
    }

    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  handleCheckout = async event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
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
      await this.props.cartCheckout(info).then(cart.clear())

      // set order fuilfilled to true in backend
      // await this.props.cartCheckout(this.props.user.id)
      // clear localStorage
    }
    this.setState({validated: true})
    if (!cart.length) {
      history.push('/orders/confirmation')
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="product-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
        </div>
        <div className="product-container-left">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              cart={cart}
              user={this.state}
              handleCheckout={this.handleCheckout}
              handleChange={this.handleChange}
            />
          </Elements>
        </div>
        <div className="product-container-right">
          <Table responsive>
            <tbody>
              {Object.keys(cart).map(productId => {
                const info = {
                  userId: this.props.user.id,
                  productId,
                  price: +JSON.parse(cart[productId]).price,
                  imageUrl: JSON.parse(cart[productId]).imageUrl
                }
                return (
                  <ProductLine
                    product={JSON.parse(cart[productId])}
                    info={info}
                    key={productId}
                  />
                )
              })}
            </tbody>
          </Table>
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

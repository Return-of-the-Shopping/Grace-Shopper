import React from 'react'
import {connect} from 'react-redux'
import {Form, InputGroup, Button} from 'react-bootstrap'
import cart from '../cart'
import {cartCheckout, updateSingleProduct} from '../store/singleProduct'
import history from '../history'
import {UserForm} from '.'

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
    // console.log('mount', user)
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
    // console.log(this.state)
  }

  handleSubmit = async event => {
    // const [validated, setValidated] = React.useState(false)

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

      // set order fuilfilled to true in backend
      await this.props.cartCheckout(this.props.user.id)
      // clear localStorage
      cart.clear()

      history.push('/orders/confirmation')
    }
    this.setState({validated: true})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    // console.log(this.state)
    // const {validated} = this.state

    return (
      <div className="product-container">
        <div className="product-container-left">
          <UserForm
            for="checkout"
            cart={cart}
            user={this.state}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          {/* <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group md="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group md="4" controlId="validationCustomEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your email.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group md="6" controlId="validationCustom03">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  required
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group md="6" controlId="validationCustom03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  required
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group md="3" controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  required
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group md="3" controlId="validationCustom05">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip"
                  required
                  name="zipcode"
                  value={this.state.zipcode}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
              />
            </Form.Group>
            <Button type="submit">Confirm Purchase</Button>
          </Form> */}
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
    // fetchProducts: () => dispatch(fetchProducts()),
    // addProduct: (product) => dispatch(addProductToServer(product)),
    // deleteProduct: (productId) => dispatch(deleteProductFromServer(productId)),
    updateSingleProduct: (productId, update) =>
      dispatch(updateSingleProduct(productId, update)),
    cartCheckout: userId => dispatch(cartCheckout(userId))
  }
}

export default connect(mapState, mapDispatch)(Checkout)

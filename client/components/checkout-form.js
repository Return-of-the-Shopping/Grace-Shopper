import React, {useState, useEffect} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {Form, InputGroup, Button} from 'react-bootstrap'
import CardSection from './card-section'

const CheckoutForm = props => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe()
  const elements = useElements()
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    zipcode,
    validated
  } = props.user

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({items: [{id: 'xl-tshirt'}]})
      })
      .then(res => {
        return res.json()
      })
      .then(data => {
        setClientSecret(data.clientSecret)
      })
  }, [])

  const handleChange = async event => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
    props.handleChange(event)
  }

  const handleSubmit = async ev => {
    ev.preventDefault()
    props.handleSubmit()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
      console.log('Succeeded')
      history.push('/orders/confirmation')
    }
  }

  return (
    <Form
      noValidate
      validated={validated}
      className="flex-col"
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <Form.Group md="4" controlId="validationCustom01">
        <Form.Label>First name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="First name"
          name="firstName"
          value={firstName}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid first name
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Last name"
          name="lastName"
          value={lastName}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback>
          Please enter a valid last name
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group md="4" controlId="validationCustom03">
        <Form.Label>Email</Form.Label>

        <Form.Control
          type="email"
          placeholder="email"
          aria-describedby="inputGroupPrepend"
          required
          name="email"
          value={email}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid email address
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group md="6" controlId="validationCustom04">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Address"
          required
          name="address"
          value={address}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid billing address.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group md="6" controlId="validationCustom05">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          placeholder="City"
          required
          value={city}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid city.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group md="3" controlId="validationCustom06">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          placeholder="State"
          required
          name="state"
          value={state}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid state.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group md="3" controlId="validationCustom07">
        <Form.Label>Zip</Form.Label>
        <Form.Control
          type="number"
          placeholder="Zip"
          required
          name="zipcode"
          value={zipcode}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid zip.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>
      <CardSection />
      <Button type="submit" disabled={!stripe}>
        {`Place Order $
            ${(
              Object.keys(props.cart).reduce(
                (orderTotal, productId) =>
                  orderTotal +
                  JSON.parse(props.cart[productId]).price *
                    JSON.parse(props.cart[productId]).quantity,
                0
              ) / 100
            ).toFixed(2)}`}
      </Button>
    </Form>
  )
}

export default CheckoutForm

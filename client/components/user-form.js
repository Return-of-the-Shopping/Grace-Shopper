import React from 'react'
import {Form, InputGroup, Button} from 'react-bootstrap'

const UserForm = props => {
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

  return (
    <Form
      noValidate
      validated={validated}
      className="flex-col"
      onSubmit={props.handleSubmit}
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
      <Button type="submit">
        {props.for === 'checkout'
          ? `Place Order ($` +
            (
              Object.keys(props.cart).reduce(
                (orderTotal, productId) =>
                  orderTotal +
                  JSON.parse(props.cart[productId]).price *
                    JSON.parse(props.cart[productId]).quantity,
                0
              ) / 100
            ).toFixed(2) +
            `)`
          : 'Update User'}
      </Button>
    </Form>
  )
}

export default UserForm

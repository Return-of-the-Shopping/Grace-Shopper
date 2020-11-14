import React from 'react'
import {Form, InputGroup, Button} from 'react-bootstrap'

const userForm = props => {
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    zip,
    validated
  } = props.user
  console.log(props)
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
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group md="4" controlId="validationCustomUsername">
        <Form.Label>Email</Form.Label>

        <Form.Control
          type="text"
          placeholder="email"
          aria-describedby="inputGroupPrepend"
          required
          name="email"
          value={email}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please choose a username.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group md="6" controlId="validationCustom03">
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
          Please provide a valid address.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group md="6" controlId="validationCustom03">
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

      <Form.Group md="3" controlId="validationCustom04">
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

      <Form.Group md="3" controlId="validationCustom05">
        <Form.Label>Zip</Form.Label>
        <Form.Control
          type="text"
          placeholder="Zip"
          required
          name="zip"
          value={zip}
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
      <Button type="submit">Save Changes</Button>
    </Form>
  )
}

export default userForm

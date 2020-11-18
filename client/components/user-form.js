import React from 'react'
import {Form, Button} from 'react-bootstrap'

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
          name="address"
          value={address}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback />
      </Form.Group>

      <Form.Group md="6" controlId="validationCustom05">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback />
      </Form.Group>

      <Form.Group md="3" controlId="validationCustom06">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          placeholder="State"
          name="state"
          value={state}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback />
      </Form.Group>

      <Form.Group md="3" controlId="validationCustom07">
        <Form.Label>Zip</Form.Label>
        <Form.Control
          type="number"
          placeholder="Zip"
          name="zipcode"
          value={zipcode}
          onChange={props.handleChange}
        />
        <Form.Control.Feedback />
      </Form.Group>

      <Button type="submit">Update User</Button>
    </Form>
  )
}

export default UserForm

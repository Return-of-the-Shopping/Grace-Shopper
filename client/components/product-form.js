import React from 'react'
import {Form, Button} from 'react-bootstrap'

const ProductForm = props => {
  const {
    handleSubmit,
    handleChange,
    name,
    category,
    description,
    abv,
    imageUrl,
    price,
    quantity,
    error,
    validated
  } = props

  return (
    <div className="form-container">
      <Form
        className="flex-col"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please check username
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="4" controlId="validationCustom02">
          <Form.Label>Category</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Category"
            name="category"
            value={category}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please check category
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="4" controlId="validationCustom02">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="description"
            name="description"
            value={description}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please write a short description
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" controlId="validationCustomUsername">
          <Form.Label>ABV</Form.Label>
          <Form.Control
            type="integer"
            placeholder="10.00"
            required
            name="abv"
            min="0"
            value={abv}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please use a number, 0.00 - 100.00
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="6" controlId="validationCustom03">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Image Url"
            required
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please check your image url.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="6" controlId="validationCustom03">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="integer"
            name="quantity"
            placeholder="100"
            required
            min="0"
            value={quantity}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid" />
        </Form.Group>

        <Form.Group md="3" controlId="validationCustom04">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="$10.00"
            required
            name="price"
            value={price}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a price, from $0.00
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        {error && <div>SHIT WHENT DOWN! {error.message}</div>}
        <Button type="submit">
          {props.for === 'add' ? 'Add Product' : 'Update Product'}
        </Button>
      </Form>
    </div>
  )
}

export default ProductForm

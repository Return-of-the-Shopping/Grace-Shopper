import React from 'react'
import {Form, Button, InputGroup} from 'react-bootstrap'

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
    validated,
    success
  } = props

  return (
    <div className="product-container">
      <div className="product-container-left">
        <div className="">{success && success}</div>
      </div>
      <div className="product-container-right">
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
              as="textarea"
              required
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
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                placeholder="10.00"
                required
                name="abv"
                min="0"
                value={abv}
                onChange={handleChange}
              />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              Please use a %, 0.00% - 100.00%
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group md="6" controlId="validationCustom03">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image Url"
              name="imageUrl"
              value={imageUrl}
              onChange={handleChange}
            />
            {/* <Form.Control.Feedback type="invalid">
            Please check your image url.
          </Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group md="6" controlId="validationCustom03">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
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
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                placeholder="10.00"
                required
                name="price"
                min="0"
                value={price}
                onChange={handleChange}
              />
            </InputGroup>
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
          {error && <div>{error.message}</div>}
          <Button type="submit">
            {props.for === 'add' ? 'Add Product' : 'Update Product'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default ProductForm

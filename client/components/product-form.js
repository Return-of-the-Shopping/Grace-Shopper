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
    validated
  } = props

  return (
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
          defaultValue="Uncategorized"
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

      <Form.Group md="4" controlId="validationCustom03">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          defaultValue=""
          placeholder="description"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <Form.Control.Feedback />
      </Form.Group>

      <Form.Group md="4" controlId="validationCustom04">
        <Form.Label>ABV</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            type="number"
            placeholder="10.00"
            required
            defaultValue="5.0"
            name="abv"
            min="0"
            max="100"
            step=".01"
            value={abv}
            onChange={handleChange}
          />
          <InputGroup.Append>
            <InputGroup.Text>%</InputGroup.Text>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">
            Please use a %, 0.00% - 100.00%
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group md="6" controlId="validationCustom05">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Image Url"
          defaultValue=""
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group md="6" controlId="validationCustom06">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          defaultValue="10"
          placeholder="100"
          required
          min="0"
          value={quantity}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Quantity cannot be empty
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group md="3" controlId="validationCustom07">
        <Form.Label>Price</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="number"
            placeholder="10.00"
            required
            defaultValue="10.00"
            name="price"
            min="0"
            step=".01"
            value={price}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Price cannot be empty
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Button type="submit">
        {props.for === 'add' ? 'Add Product' : 'Update Product'}
      </Button>
    </Form>
  )
}

export default ProductForm

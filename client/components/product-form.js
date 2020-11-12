import React from 'react'

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
    error
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Product Name</label>
      <input type="text" name="name" value={name} onChange={handleChange} />

      <label htmlFor="category">Category</label>
      <input
        type="text"
        name="category"
        value={category}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
      />

      <label htmlFor="abv">abv</label>
      <input type="text" name="abv" value={abv} onChange={handleChange} />

      <label htmlFor="imageUrl">Image Url</label>
      <input
        type="text"
        name="imageUrl"
        value={imageUrl}
        onChange={handleChange}
      />

      <label htmlFor="price">Price</label>
      <input type="text" name="price" value={price} onChange={handleChange} />

      <label htmlFor="quantity">Quantity</label>
      <input
        type="text"
        name="quantity"
        value={quantity}
        onChange={handleChange}
      />

      <button type="submit">
        {/* Take note of props.for; I passed down "for" as props from component to this form */}
        {props.for === 'add' ? 'Add Product' : 'Update Product'}
      </button>
      {error && <p className="error">Name is required!</p>}
    </form>
  )
}

export default ProductForm

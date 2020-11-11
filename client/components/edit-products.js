import React from 'react'
import Form from './product-form'

export default class CampusUpdate extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      category: '',
      description: '',
      abv: '',
      imageUrl: '',
      price: '',
      quantity: '',
      update: false,
      error: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate() {
    const product = this.props.singleProduct

    if (!this.state.update) {
      this.setState({
        name: product.name,
        category: product.category,
        description: product.description,
        abv: product.abv,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: product.quantity,
        update: true
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (!this.state.name) {
      this.setState({
        error: true
      })
    } else {
      this.props.updateSingleProduct(this.props.singleProduct.id, this.state)

      this.setState({
        error: false
      })
    }
  }

  render() {
    return (
      <Form
        for="update"
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        name={this.state.name}
        category={this.state.category}
        description={this.state.description}
        abv={this.state.abv}
        imageUrl={this.state.imageUrl}
        price={this.state.price}
        quantity={this.state.quantity}
        error={this.state.error}
      />
    )
  }
}

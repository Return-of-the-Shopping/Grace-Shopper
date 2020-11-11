import React from 'react'
import Form from './product-form'

export default class CampusForm extends React.Component {
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
      error: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      this.props.addProduct(this.state)

      this.setState({
        name: '',
        category: '',
        description: '',
        abv: '',
        imageUrl: '',
        price: '',
        quantity: '',
        error: false
      })
    }
  }

  render() {
    return (
      <Form
        for="add"
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

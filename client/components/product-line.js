import React from 'react'
import {InputGroup, Button, FormControl} from 'react-bootstrap'

class ProductLine extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
      // update: false,
    }

    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const product = this.props.product
    console.log('running?')

    this.setState({
      quantity: product.quantity
      // update: true,
    })

    // if (!this.state.update) {
    //   this.setState({
    //     quantity: product.quantity,
    //     update: true,
    //   })
    // }
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const product = this.props.product
    const info = this.props.info
    console.log(this.state.quantity)
    return (
      <tr>
        <td>
          <img src={product.imageUrl} />
        </td>
        <td>{product.name}</td>
        <td>{`$` + (product.price / 100).toFixed(2)}</td>
        <td>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <Button
                disabled={!this.state.quantity}
                variant="outline-secondary"
                onClick={() => {
                  this.setState(prevState => ({
                    quantity: +prevState.quantity - 1
                  }))
                  // this.props.resetCartState()
                }}
              >
                -
              </Button>
            </InputGroup.Prepend>
            <FormControl
              aria-describedby="basic-addon1"
              type="number"
              name="quantity"
              min="0"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  this.setState(prevState => ({
                    quantity: +prevState.quantity + 1
                  }))
                  // this.props.resetCartState()
                }}
              >
                +
              </Button>
            </InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={event => {
                event.preventDefault()
                info.quantity = +this.state.quantity
                const change = {...product, quantity: +info.quantity}
                if (info.quantity <= 0) {
                  this.props.cart.removeItem(info.productId)
                  this.props.resetCartState()
                } else {
                  this.props.cart.setItem(
                    info.productId,
                    JSON.stringify(change)
                  )
                }
                this.props.editCart(info)
                this.props.resetCartState()
              }}
            >
              Update
            </Button>
          </InputGroup>
        </td>
        <td>{`$` + (product.price / 100 * this.state.quantity).toFixed(2)}</td>
        <td>
          <Button
            variant="outline-secondary"
            onClick={event => {
              event.preventDefault()

              this.props.cart.removeItem(info.productId)
              this.props.removeCart(info)
              this.props.resetCartState()
            }}
          >
            X
          </Button>
        </td>
      </tr>
    )
  }
}

export default ProductLine

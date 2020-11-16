import React from 'react'
import {connect} from 'react-redux'
import {
  fetchSingleProduct,
  updateSingleProduct,
  putToCart
} from '../store/singleProduct'
import {deleteProductFromServer} from '../store/products'
import {Button, InputGroup, FormControl, Form} from 'react-bootstrap'
import {AdminTools, EditProduct} from '../components'
import cart from '../cart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      toggleEdit: false,
      validated: false,
      success: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    const product = this.props.product
    const user = this.props.user
    const form = event.currentTarget

    event.preventDefault()

    if (form.checkValidity() === false) {
      this.setState({validated: true})
      event.stopPropagation()
    } else {
      try {
        this.setState({error: null})

        const checkoutInfo = {
          name: product.name,
          price: +product.price,
          quantity: +this.state.quantity,
          imageUrl: product.imageUrl
        }

        const info = {
          productId: product.id,
          userId: user.id,
          price: +product.price,
          quantity: +this.state.quantity
        }

        this.props
          .addToCart(info)
          .then(cart.setItem(product.id, JSON.stringify(checkoutInfo)))
      } catch (error) {
        this.setState({error: error})
      }
      if (!this.state.error) {
        this.setState(state => ({
          error: null,
          success: `Successfully added (${state.quantity}) ${
            state.name
          }(s) to your cart.`,
          validated: false
        }))
      }
    }

    // const checkoutInfo = {
    //   name: product.name,
    //   price: product.price,
    //   quantity: this.state.quantity,
    //   imageUrl: product.imageUrl,
    // }
    // cart.setItem(product.id, JSON.stringify(checkoutInfo))
    // const info = {
    //   productId: product.id,
    //   userId: user.id,
    //   price: product.price,
    //   quantity: this.state.quantity,
    // }
    // this.props.addToCart(info)
  }

  toggleEdit() {
    console.log(this.state.toggleEdit)
    this.setState(prevState => ({
      toggleEdit: !prevState.toggleEdit
    }))
  }

  handleDelete() {
    this.props.deleteProduct(this.props.product.id)
    this.props.history.push('/products')
  }

  render() {
    const {product} = this.props

    return (
      <div>
        {this.props.user.admin && (
          <AdminTools
            toggleEdit={this.toggleEdit}
            handleDelete={this.handleDelete}
          />
        )}
        <div className="product-container">
          <div className="product-container-left">
            {product.imageUrl && <img src={product.imageUrl} />}
          </div>
          <div className="product-container-right">
            {this.state.toggleEdit ? (
              <EditProduct product={product} toggleEdit={this.toggleEdit} />
            ) : (
              <div>
                <h1>{product.name}</h1>
                <h2>{product.abv}%</h2>
                <hr />
                <h6>Product Description:</h6>
                <p>{product.description}</p>
                <h3>${(product.price / 100).toFixed(2)}</h3>

                {product.quantity && (
                  <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleSubmit}
                  >
                    <Form.Group md="4" controlId="validationCustom04">
                      <Form.Label>
                        <i>{product.quantity} in stock</i>
                      </Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <Button
                            variant="outline-secondary"
                            disabled={this.state.quantity <= 1}
                            onClick={() =>
                              this.setState(state => ({
                                quantity: +state.quantity - 1
                              }))
                            }
                          >
                            -
                          </Button>
                        </InputGroup.Prepend>
                        <FormControl
                          aria-describedby="basic-addon1"
                          type="number"
                          name="quantity"
                          min="0"
                          max={product.quantity}
                          onChange={this.handleChange}
                          value={this.state.quantity}
                        />
                        <InputGroup.Append>
                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              this.setState(state => ({
                                quantity: +state.quantity + 1
                              }))
                            }
                          >
                            +
                          </Button>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                          The quantity you selected is invalid
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={!product.quantity}
                    >
                      Add to Cart
                    </Button>
                  </Form>
                )}
              </div>
            )}
            {!product.quantity && 'Sorry, Sold Out'}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchSingleProduct(productId)),
    deleteProduct: productId => dispatch(deleteProductFromServer(productId)),
    updateProduct: (productId, update) =>
      dispatch(updateSingleProduct(productId, update)),
    addToCart: info => dispatch(putToCart(info))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

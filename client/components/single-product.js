import React from 'react'
import {connect} from 'react-redux'
import {
  fetchSingleProduct,
  updateSingleProduct
  /*putToCart*/
} from '../store/singleProduct'
import {putToCart} from '../store/cart'
import {deleteProductFromServer} from '../store/products'

import {AdminTools, EditProduct, NotFound} from '../components'
import {Button, InputGroup, FormControl, Form} from 'react-bootstrap'
import cart from '../cart'
import {toast} from 'react-toastify'
import {green} from '@material-ui/core/colors'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      toggleEdit: false,
      error: null,
      validated: false,
      success: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props
      .fetchProduct(this.props.match.params.productId)
      .catch(error => this.setState({error}))
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
          id: product.id,
          name: product.name,
          price: +product.price,
          quantity: +this.state.quantity,
          imageUrl: product.imageUrl
        }

        const info = {
          productId: +product.id,
          userId: user.id,
          price: +product.price,
          quantity: +this.state.quantity,
          imageUrl: product.imageUrl
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

          validated: false
        }))
        toast(
          `Added (${this.state.quantity}) ${
            this.props.product.name
          }(s) to your cart.`,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            progressStyle: {backgroundColor: '#4caf50'}
          }
        )
      }
    }
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

    if (this.state.error) {
      return <NotFound />
    }

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
                  <div className="product-add">
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
                                  quantity: +state.quantity - 1,
                                  success: ''
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
                                  quantity: +state.quantity + 1,
                                  success: ''
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
                        block
                        variant="warning"
                        type="submit"
                        size="lg"
                        disabled={!product.quantity}
                      >
                        Add to Cart
                      </Button>
                      {this.state.success && this.state.success}
                    </Form>
                  </div>
                )}
              </div>
            )}
            {!product.quantity && (
              <div className="sold-out">Sorry, Sold Out</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct,
    user: state.user,
    cart: state.cart
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

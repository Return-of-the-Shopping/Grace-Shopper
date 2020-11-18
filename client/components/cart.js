import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromCart, editInCart} from '../store/cart'
import cart from '../cart'
import ProductLine from './product-line'
import {Table} from 'react-bootstrap'
import {toast} from 'react-toastify'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      cartUpdate: false
    }
    this.resetCartState = this.resetCartState.bind(this)
  }

  resetCartState(state) {
    this.setState({cartUpdate: !state.cartUpdate})
    toast(`Successfully updated your cart!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined
    })
  }

  render() {
    return (
      <div className="cart-container">
        <h1>Cart</h1>
        <Table responsive>
          <tbody>
            {Object.keys(cart).map(productId => {
              const info = {
                userId: this.props.user.id,
                productId,
                price: +JSON.parse(cart[productId]).price,
                imageUrl: JSON.parse(cart[productId]).imageUrl
              }
              return (
                <ProductLine
                  product={JSON.parse(cart[productId])}
                  info={info}
                  editCart={this.props.editCart}
                  removeCart={this.props.removeCart}
                  key={productId}
                  cart={cart}
                  resetCartState={() => this.resetCartState(this.state)}
                />
              )
            })}
            <tr>
              <th />
              <th />
              <th />
              <th>Order Total</th>
              <th>
                {`$` +
                  (
                    Object.keys(cart).reduce(
                      (orderTotal, productId) =>
                        orderTotal +
                        JSON.parse(cart[productId]).price *
                          JSON.parse(cart[productId]).quantity,
                      0
                    ) / 100
                  ).toFixed(2)}
              </th>
              <th />
            </tr>
          </tbody>
        </Table>
        <div>
          {Object.keys(cart).length && (
            <Link to="/checkout" className="big-button">
              Checkout
            </Link>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    removeCart: info => dispatch(removeFromCart(info)),
    editCart: info => dispatch(editInCart(info)),
    updateOrderTotal: orderTotal => dispatch(updateOrderTotal(orderTotal))
  }
}

export default connect(mapState, mapDispatch)(Cart)

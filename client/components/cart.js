import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromCart, editInCart} from '../store/singleProduct'
import cart from '../cart'
import ProductLine from './product-line'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      // orderTotal: 0,
      cartUpdate: false
    }

    this.resetCartState = this.resetCartState.bind(this)
    // this.resetOrderTotal = this.resetOrderTotal.bind(this)
  }

  // resetOrderTotal(state, operation, amount) {
  //   if (operation === 'add') {
  //     this.setState({orderTotal: state.orderTotal})
  //   } else {
  //     this.setState({})
  //   }
  // }

  resetCartState(state) {
    this.setState({cartUpdate: !state.cartUpdate})
  }

  render() {
    return (
      <div>
        <div>
          {Object.keys(cart).map(productId => {
            const info = {
              userId: this.props.user.id,
              productId
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
        </div>
        <div>
          Order Total:{' '}
          {Object.keys(cart).reduce(
            (orderTotal, productId) =>
              orderTotal +
              JSON.parse(cart[productId]).price *
                JSON.parse(cart[productId]).quantity,
            0
          )}
        </div>
        <div>
          {Object.keys(cart).length && (
            <Link to="/checkout">
              <button type="button">Checkout</button>
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
    // getCart: orderId => dispatch(fetchCart(orderId)),
    removeCart: info => dispatch(removeFromCart(info)),
    editCart: info => dispatch(editInCart(info)),
    updateOrderTotal: orderTotal => dispatch(updateOrderTotal(orderTotal))
  }
}

export default connect(mapState, mapDispatch)(Cart)

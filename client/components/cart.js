import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart, editInCart} from '../store/singleProduct'
import cart from '../cart'
import ProductLine from './product-line'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      orderTotal: 0,
      cartUpdate: false
    }

    this.resetCartState = this.resetCartState.bind(this)
  }

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
        <div />
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
    getCart: orderId => dispatch(fetchCart(orderId)),
    removeCart: info => dispatch(removeFromCart(info)),
    editCart: info => dispatch(editInCart(info))
  }
}

export default connect(mapState, mapDispatch)(Cart)

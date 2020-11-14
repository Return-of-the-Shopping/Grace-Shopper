import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart, editInCart} from '../store/singleProduct'
import cart from '../cart'
import ProductLine from './product-line'

class Cart extends React.Component {
  render() {
    return (
      <div>
        {Object.keys(cart).map(productId => (
          <ProductLine product={JSON.parse(cart[productId])} key={productId} />
        ))}
      </div>
    )
  }
}

const mapDispatach = dispatch => {
  return {
    getCart: orderId => dispatch(fetchCart(orderId)),
    removeCart: info => dispatch(removeFromCart(info)),
    editCart: info => dispatch(editInCart(info))
  }
}

export default connect(null, mapDispatach)(Cart)

import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const EDIT_CART = 'EDIT_CART'
const GET_CART = 'GET_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const addToCart = product => ({type: ADD_TO_CART, product})
const deleteFromCart = info => ({type: DELETE_FROM_CART, info})
const editCart = info => ({type: EDIT_CART, info})
const getCart = cart => ({type: GET_CART, cart})
const checkoutCart = () => ({type: CHECKOUT_CART})

/**
 * THUNK CREATORS
 */
export const putToCart = info => async dispatch => {
  try {
    await axios.post(`/api/orders`, info)
    dispatch(addToCart(info))
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCart = info => async dispatch => {
  try {
    console.log('XXXXX', info)
    await axios.delete(`/api/orders/`, {data: info})
    dispatch(deleteFromCart(info))
  } catch (err) {
    console.error(err)
  }
}

export const editInCart = info => async dispatch => {
  try {
    await axios.put(`/api/orders`, info)
    dispatch(editCart(info))
  } catch (err) {
    console.error(err)
  }
}

export const fetchCart = userId => async dispatch => {
  try {
    // grab cart using userId; store cart in state and compare product to cart quantities; update product quantity info
    await axios.get(`/api/users/orders/${userId}`)
    dispatch(getCart())
  } catch (err) {
    console.error(err)
  }
}

export const cartCheckout = userId => async dispatch => {
  try {
    await axios.put(`/api/orders/checkout`, {userId})
    dispatch(checkoutCart())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart

    case ADD_TO_CART:
      console.log([...state, action.product])
      let duplicate = false
      let newCart = state.map(product => {
        if (product.productId === +action.product.productId) {
          product = action.product
          duplicate = true
        }
        return product
      })
      if (!duplicate) return [...state, action.product]
      return newCart

    case DELETE_FROM_CART:
      return state.filter(
        product => product.productId !== +action.info.productId
      )

    case EDIT_CART:
      return state.map(product => {
        console.log(product)
        console.log(+action.info.productId)
        if (product.productId === +action.info.productId) {
          product = action.info
        }
        return product
      })

    case CHECKOUT_CART:
      return defaultCart

    default:
      return state
  }
}

import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_SINGLE_PRODUCT = 'UPDATE_SINGLE_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const EDIT_CART = 'EDIT_CART'
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const defaultSingleProduct = {}

/**
 * ACTION CREATORS
 */
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})
const updateProduct = info => ({type: UPDATE_SINGLE_PRODUCT, info})
const addToCart = () => ({type: ADD_TO_CART})
const deleteFromCart = () => ({type: DELETE_FROM_CART})
const editCart = () => ({type: EDIT_CART})
const getCart = () => ({type: GET_CART})

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(res.data || defaultSingleProduct))
  } catch (err) {
    console.error(err)
  }
}

export const updateSingleProduct = (productId, update) => async dispatch => {
  try {
    const res = await axios.put(`/api/products/${productId}`, update)
    dispatch(updateProduct(res.data))
  } catch (err) {
    console.log(err)
  }
}

export const putToCart = info => async dispatch => {
  try {
    await axios.post(`/api/orders`, info)
    dispatch(addToCart())
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCart = info => async dispatch => {
  try {
    await axios.delete(`/api/orders`, info)
    dispatch(deleteFromCart())
  } catch (err) {
    console.error(err)
  }
}

export const editInCart = info => async dispatch => {
  try {
    await axios.put(`/api/orders`, info)
    dispatch(editCart())
  } catch (err) {
    console.error(err)
  }
}

export const fetchCart = orderId => async dispatch => {
  try {
    await axios.get(`/api/orders/${orderId}`)
    dispatch(getCart())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultSingleProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    case UPDATE_SINGLE_PRODUCT:
      return {...state, ...action.info}
    default:
      return state
  }
}

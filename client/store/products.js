import axios from 'axios' //CRUD

/**
 * ACTION TYPES
 */
const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

/**
 * INITIAL STATE
 */
const INITIAL_STATE = {all: [], loading: true}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

const addProduct = product => ({type: ADD_PRODUCT, product})

const deleteProduct = productId => ({type: DELETE_PRODUCT, productId})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addProductToServer = product => async dispatch => {
  try {
    const res = await axios.post('/api/products', product)
    dispatch(addProduct(res.data))
  } catch (err) {
    console.log(err)
  }
}

export const deleteProductFromServer = productId => async dispatch => {
  try {
    await axios.delete(`/api/products/${productId}`)
    dispatch(deleteProduct(productId))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        all: [...state.all, action.product],
        loading: true
      }
    case GET_PRODUCTS:
      return {
        all: action.products,
        loading: false
      }
    case DELETE_PRODUCT:
      return {
        all: state.all.filter(product => product.id !== action.productId),
        loading: false
      }
    default:
      return state
  }
}

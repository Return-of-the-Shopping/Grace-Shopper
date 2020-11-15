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
const defaultProducts = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

const addProduct = product => ({type: ADD_PRODUCT, product})

const deleteProduct = product => ({type: DELETE_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data || defaultProducts))
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
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.product]
    case GET_PRODUCTS:
      return action.products
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}

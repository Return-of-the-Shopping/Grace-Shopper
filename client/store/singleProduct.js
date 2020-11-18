import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_SINGLE_PRODUCT = 'UPDATE_SINGLE_PRODUCT'
const RESET_PRODUCT_LOADING = 'RESET_PRODUCT_LOADING'

/**
 * INITIAL STATE
 */
const INITIAL_STATE = {info: {}, loading: true}

/**
 * ACTION CREATORS
 */
export const resetProductLoader = () => ({
  type: RESET_PRODUCT_LOADING
})

const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})
const updateProduct = info => ({type: UPDATE_SINGLE_PRODUCT, info})

/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = productId => async dispatch => {
  const res = await axios.get(`/api/products/${productId}`)
  dispatch(getSingleProduct(res.data || defaultSingleProduct))
}

export const updateSingleProduct = (productId, update) => async dispatch => {
  try {
    const res = await axios.put(`/api/products/${productId}`, update)
    dispatch(updateProduct(res.data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {
        info: action.product,
        loading: false
      }
    case UPDATE_SINGLE_PRODUCT:
      return {
        info: {...state.info, ...action.info},
        loading: false
      }
    case RESET_PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

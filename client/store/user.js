import axios from 'axios'
import history from '../history'
import cart from '../cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_USER_CART = 'GET_USER_CART'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const getUserCart = () => ({type: GET_ALL_USERS})

/**
 * THUNK CREATORS
 */
export const getUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    console.log('data', data)
    dispatch(getAllUsers(data))
  } catch (error) {
    console.error(error)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    const {data} = await axios.get(`api/users/orders/${res.data.id}`)
    if (data) {
      const {products} = data
      products.map(product => {
        const info = {
          name: product.name,
          price: product.price,
          quantity: product.productOrder.quantity,
          imageUrl: product.imageUrl
        }
        return cart.setItem(product.id, JSON.stringify(info))
      })
    }
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

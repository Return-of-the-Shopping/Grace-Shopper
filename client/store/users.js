import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */

const getAllUsers = users => ({type: GET_ALL_USERS, users})

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

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}

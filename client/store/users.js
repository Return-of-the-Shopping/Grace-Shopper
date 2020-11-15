import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_SINGLE_USER = 'REMOVE_SINGLE_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */

const getAllUsers = users => ({type: GET_ALL_USERS, users})
const removeSingleUser = userId => ({type: REMOVE_SINGLE_USER, userId})

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

export const removeSingleUserDb = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(removeSingleUser(userId))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case REMOVE_SINGLE_USER:
      return state.filter(user => user.id !== action.userId)

    default:
      return state
  }
}

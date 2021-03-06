import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_SINGLE_USER = 'REMOVE_SINGLE_USER'

/**
 * INITIAL STATE
 */
const INITIAL_STATE = {all: [], loading: true}

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
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        all: action.users,
        loading: false
      }

    case REMOVE_SINGLE_USER:
      return {
        all: state.all.filter(user => user.id !== action.userId),
        loading: false
      }
    default:
      return state
  }
}

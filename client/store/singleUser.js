import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const UPDATE_SINGLE_USER = 'UPDATE_SINGLE_USER'

/**
 * INITIAL STATE
 */
const defaultSingle = {}

/**
 * ACTION CREATORS
 */
const getSingleUser = singleUser => ({type: GET_SINGLE_USER, singleUser})

const updateSingleUser = singleUser => ({
  type: UPDATE_SINGLE_USER,
  singleUser
})

/**
 * THUNK CREATORS
 */
export const getSingleUserDb = userId => async dispatch => {
  try {
    // if (loginUser.id === userId ||| loginUser.admin)
    //can we protect this, if you're NOT the user?
    const {data} = await axios.get(`/api/users/${userId}`)
    dispatch(getSingleUser(data))
  } catch (err) {
    console.log(err)
  }
}

export const updateSingleUserDb = (userId, update) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${userId}`, update)
    dispatch(updateSingleUser(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultSingle, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.singleUser
    case UPDATE_SINGLE_USER:
      return action.singleUser
    default:
      return state
  }
}

import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const UPDATE_SINGLE_USER = 'UPDATE_SINGLE_USER'
const REMOVE_SINGLE_USER = 'REMOVE_SINGLE_USER'

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
const removeSingleUser = () => ({type: REMOVE_SINGLE_USER})

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

export const updateSingleUserDb = () => ({})
export const removeSingleUserDb = () => ({})

/**
 * REDUCER
 */
export default function(state = defaultSingle, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.singleUser
    case UPDATE_SINGLE_USER:
      return action.singleUser
    case REMOVE_SINGLE_USER:
      return defaultSingle
    default:
      return state
  }
}

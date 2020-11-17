import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const UPDATE_SINGLE_USER = 'UPDATE_SINGLE_USER'
const RESET_USER_LOADING = 'RESET_USER_LOADING'

/**
 * INITIAL STATE
 */
const INITIAL_STATE = {info: {}, loading: true}

/**
 * ACTION CREATORS
 */
export const resetUserLoading = () => ({
  type: RESET_USER_LOADING
})

const getSingleUser = singleUser => ({type: GET_SINGLE_USER, singleUser})

const updateSingleUser = singleUser => ({
  type: UPDATE_SINGLE_USER,
  singleUser
})

/**
 * THUNK CREATORS
 */
export const getSingleUserDb = userId => async dispatch => {
  // if (loginUser.id === userId ||| loginUser.admin)
  //can we protect this, if you're NOT the user?
  const {data} = await axios.get(`/api/users/${userId}`)
  dispatch(getSingleUser(data))
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
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return {
        info: action.singleUser,
        loading: false
      }
    case UPDATE_SINGLE_USER:
      return {
        info: action.singleUser,
        loading: false
      }
    case RESET_USER_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

const GET_ORDER = 'GET_ORDER'

const defaultOrder = {}

export const getOrder = order => ({type: GET_ORDER, order})

// export const fetchOrder = (info) => async (dispatch) => {
//   try {
//     const {data} = await axios.post(`/api/orders`, info)
//     console.log(data)
//     dispatch(getOrder(data))
//   } catch (err) {
//     console.error(err)
//   }
// }

export default function(state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}

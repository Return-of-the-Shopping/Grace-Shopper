/**
 * ACTION TYPES
 */
const ORDER_TOTAL = 'ORDER_TOTAL'

/**
 * INITIAL STATE
 */
const defaultOrderTotal = {}

/**
 * ACTION CREATORS
 */
export const updateOrderTotal = orderTotal => ({
  type: ORDER_TOTAL,
  orderTotal
})

/**
 * REDUCER
 */
export default function(state = defaultOrderTotal, action) {
  switch (action.type) {
    case ORDER_TOTAL:
      return action.orderTotal
    default:
      return state
  }
}

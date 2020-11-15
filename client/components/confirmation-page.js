import React from 'react'

const ConfirmationPage = props => {
  return (
    <div>
      Your Order has been confirmed!
      {props.order.id}
    </div>
  )
}

export default ConfirmationPage

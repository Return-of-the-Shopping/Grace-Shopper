import React, {Component} from 'react'
import {connect} from 'react-redux'

export class SingleUser extends Component {
  render() {
    const {user} = this.props
    console.log('user props', user)
    return (
      <div className="product-container">
        <div className="product-container-left" />
        <div className="product-container-right">
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <hr />
          <p>{user.email}</p>
          <p>{user.address}</p>
          {/* add buttons to edit/delete account
          view/display based on admin rights or customer user-id */}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, null)(SingleUser)

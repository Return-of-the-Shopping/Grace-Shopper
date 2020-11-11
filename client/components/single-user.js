import React, {Component} from 'react'
import {connect} from 'react-redux'

export class SingleUser extends Component {
  render() {
    const {user} = this.props
    console.log('user props', user)
    return (
      <div>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.email}</p>
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

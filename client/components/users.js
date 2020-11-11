import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../store/user'

export class AllUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {user} = this.props
    console.log('props', this.props)

    return (
      <div>
        <h1>Hello</h1>
        {/* {users.map((user) => (
          <div key={user.id}>{users.name}</div>
        ))} */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(getUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)

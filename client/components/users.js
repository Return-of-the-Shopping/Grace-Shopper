import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../store/users'
import {Table} from 'react-bootstrap'
import {UserLine} from '../components'

export class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const {users} = this.props
    console.log(users)
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <UserLine key={user.id} user={user} />)}
        </tbody>
      </Table>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatch = dispatch => ({
  fetchUsers: () => dispatch(getUsers())
})

export default connect(mapState, mapDispatch)(AllUsers)

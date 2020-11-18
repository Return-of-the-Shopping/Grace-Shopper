import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers, removeSingleUserDb} from '../store/users'
import {Table} from 'react-bootstrap'
import {UserLine, AdminUserTools, Loading} from '../components'
import {toast} from 'react-toastify'
export class AllUsers extends Component {
  constructor() {
    super()
    this.state = {
      toggleDelete: false
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  handleDelete(userId, userName) {
    this.props.deleteUser(userId)
    toast(`Deleted ${userName} from Database!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      progressStyle: {backgroundColor: '#4caf50'}
    })
  }

  toggleDelete() {
    this.setState(state => ({
      toggleDelete: !state.toggleDelete
    }))
  }

  render() {
    const {users} = this.props
    if (this.props.loading) {
      return <Loading props="user" />
    }
    return (
      <div>
        <AdminUserTools toggleDelete={this.toggleDelete} />

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserLine
                key={user.id}
                user={user}
                toggleDelete={this.state.toggleDelete}
                handleDelete={this.handleDelete}
              />
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    users: state.users.all,
    loading: state.users.loading
  }
}

const mapDispatch = dispatch => ({
  fetchUsers: () => dispatch(getUsers()),
  deleteUser: userId => dispatch(removeSingleUserDb(userId))
})

export default connect(mapState, mapDispatch)(AllUsers)

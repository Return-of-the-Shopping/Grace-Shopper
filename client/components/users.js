import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../store/users'

export class AllUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {users} = this.props
    console.log(users)
    return (
      <div>
        <table>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            {users.map(user => (
              <React.Fragment>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
              </React.Fragment>
            ))}
          </tr>
        </table>
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

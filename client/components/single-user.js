import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  NotAdmin,
  AdminUserTools,
  NotFound,
  EditUser,
  Loading
} from '../components'
import {
  getSingleUserDb,
  updateSingleUserDb,
  resetUserLoading
} from '../store/singleUser'
import {Button} from 'react-bootstrap'
import {removeSingleUserDb} from '../store/users'
import {toast} from 'react-toastify'

export class SingleUser extends Component {
  constructor() {
    super()
    this.state = {
      toggleEdit: false
    }

    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.resetLoading()
    let user = this.props.user
    if (
      this.props.user.admin ||
      +this.props.match.params.userId === this.props.user.id
    ) {
      this.props
        .fetchSingleUser(this.props.match.params.userId)
        .catch(error => this.setState({error}))
    }
    if (
      !this.state.error &&
      (this.props.user.admin ||
        +this.props.match.params.userId === this.props.user.id)
    ) {
      user = this.props.singleUser
      this.setState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipcode: user.zipcode || ''
      })
    }
  }

  componentWillUnmount() {
    this.props.resetLoading()
  }

  toggleEdit() {
    this.setState(prevState => ({
      toggleEdit: !prevState.toggleEdit
    }))
  }

  handleDelete() {
    let userName = `${this.props.singleUser.firstName} ${
      this.props.singleUser.lastName
    }`
    if (this.props.user.id === this.props.singleUser.id) {
      this.props.deleteUser(this.props.singleUser.id)
      this.props.history.push('/signUp')
    } else {
      this.props.deleteUser(this.props.singleUser.id)
      this.props.history.push('/users')
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
  }

  render() {
    let user = this.props.user
    if (this.props.loading) {
      return <Loading props="user" />
    }

    if (user.id === +this.props.match.params.userId || user.admin) {
      user = this.props.singleUser
    } else {
      return <NotAdmin />
    }
    if (this.state.error) {
      return <NotFound />
    }
    if (
      this.props.user.id === +this.props.match.params.userId &&
      this.props.user.admin
    ) {
      this.handleDelete = false
    }

    return (
      <div>
        {this.props.user.admin && (
          <AdminUserTools
            toggleEdit={this.toggleEdit}
            handleDelete={this.handleDelete}
            toggleState={this.state.toggleEdit}
          />
        )}
        <div className="product-container">
          <div className="product-container-left">
            <h1>Profile</h1>
          </div>
          <div className="product-container-right">
            {this.state.toggleEdit ? (
              <EditUser
                user={user}
                toggleEdit={this.toggleEdit}
                matchId={this.props.match.params.userId}
              />
            ) : (
              <div>
                <h1>
                  {user.firstName} {user.lastName}
                </h1>
                <hr />
                <p>Email: {user.email}</p>
                <p>Address: {user.address}</p>
                <p>City: {user.city}</p>
                <p>State: {user.state}</p>
                <p>Zipcode: {user.zipcode}</p>
              </div>
            )}
            {!this.props.user.admin && (
              <div className="product-container">
                <Button onClick={this.toggleEdit}>
                  {!this.state.toggleEdit ? 'Edit Account' : 'Cancel Changes'}
                </Button>
                <Button variant="danger" onClick={this.handleDelete}>
                  Delete Account
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    singleUser: state.singleUser.info,
    loading: state.singleUser.loading
  }
}

const mapDispatch = dispatch => ({
  deleteUser: userId => dispatch(removeSingleUserDb(userId)),
  fetchSingleUser: userId => dispatch(getSingleUserDb(userId)),
  updateSingleUser: (userId, update) =>
    dispatch(updateSingleUserDb(userId, update)),
  resetLoading: () => dispatch(resetUserLoading())
})

export default connect(mapState, mapDispatch)(SingleUser)

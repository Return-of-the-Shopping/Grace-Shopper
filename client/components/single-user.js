import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NotAdmin, AdminUserTools, NotFound, EditUser} from '../components'
import {getSingleUserDb, updateSingleUserDb} from '../store/singleUser'
import {removeSingleUserDb} from '../store/users'
import {toast} from 'react-toastify'

export class SingleUser extends Component {
  constructor() {
    super()
    this.state = {
      // firstName: '',
      // lastName: '',
      // email: '',
      // address: '',
      // payment: '',
      // validated: false,
      // city: '',
      // state: '',
      // zipcode: null,
      // update: false,
      toggleEdit: false
      // error: null,
    }

    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  // componentDidUpdate() {
  //   const user = this.props.user
  //   console.log('mount', user)

  //   if (!this.state.update) {
  //     this.setState({
  //       firstName: user.firstName || '',
  //       lastName: user.lastName || '',
  //       email: user.email || '',
  //       address: user.address || '',
  //       payment: user.payment || '',
  //       validated: false,
  //       update: true,
  //     })
  //   }
  // }

  componentDidMount() {
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

  toggleEdit() {
    this.setState(prevState => ({
      toggleEdit: !prevState.toggleEdit
    }))
  }

  handleDelete() {
    console.log('allprops', this.props)
    let userName = `${this.props.singleUser.firstName} ${
      this.props.singleUser.lastName
    }`
    if (this.props.user.id === this.props.singleUser.id) {
      // BUG: deletes own account but doesn't log you out
      this.props.deleteUser(this.props.singleUser.id)
      this.props.history.push('/signUp')
    } else {
      this.props.deleteUser(this.props.singleUser.id)
      this.props.history.push('/allUsers')
      toast(`Deleted ${userName} from Database!`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        progressStyle: {backgroundColor: '#4caf50'}
      })
    }
  }

  // handleSubmit = (event) => {
  //   const form = event.currentTarget
  //   if (form.checkValidity() === false) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }
  //   // we need to set order fuilfilled to true in backend
  //   // also clear the local storage
  //   // error when editing from /profile >> this.props.match.params.userId does not exist
  //   this.props.updateSingleUser(this.props.match.params.userId, this.state)
  //   this.setState({validated: true})
  // }

  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   })
  // }

  render() {
    let user = this.props.user
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
      console.log(this.handleDelete)
    }
    console.log(this.props.user.id)
    console.log(user.id)
    console.log(this.props.match.params.userId)
    return (
      <div>
        {this.props.user.admin && (
          <AdminUserTools
            toggleEdit={this.toggleEdit}
            handleDelete={this.handleDelete}
          />
        )}
        <div className="product-container">
          <div className="product-container-left" />
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
              <div>
                <button onClick={this.toggleEdit}>
                  {!this.state.toggleEdit ? 'Edit Account' : 'Cancel Changes'}
                </button>
                <button onClick={this.handleDelete}>Delete Account</button>
              </div>
            )}
            {/* <button onClick={this.handleDelete}>Delete Account</button> */}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    //either you're user, or admin
    user: state.user,
    singleUser: state.singleUser
  }
}

const mapDispatch = dispatch => ({
  deleteUser: userId => dispatch(removeSingleUserDb(userId)),
  fetchSingleUser: userId => dispatch(getSingleUserDb(userId)),
  updateSingleUser: (userId, update) =>
    dispatch(updateSingleUserDb(userId, update))
})

export default connect(mapState, mapDispatch)(SingleUser)

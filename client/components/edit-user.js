import React from 'react'
import {UserForm} from '../components'
import {updateSingleUserDb, getSingleUserDb} from '../store/singleUser'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'

class EditUser extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      payment: '',
      city: '',
      state: '',
      zipcode: '',
      error: null,
      validated: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    let user = this.props.user
    if (this.props.user.admin || +this.props.matchId === this.props.user.id) {
      this.props
        .fetchSingleUser(this.props.matchId)
        .catch(error => this.setState({error}))
    }
    if (
      !this.state.error &&
      (this.props.user.admin || +this.props.matchId === this.props.user.id)
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

  handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    // we need to set order fuilfilled to true in backend
    // also clear the local storage
    // error when editing from /profile >> this.props.match.params.userId does not exist
    this.props.updateSingleUser(this.props.matchId, this.state)
    this.setState({validated: true})
    this.props.toggleEdit()
    toast(`Successfully Updated!`, {
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <div>
        <UserForm
          user={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}
const mapState = state => {
  return {
    //either you're user, or admin
    user: state.user,
    singleUser: state.singleUser.info
  }
}

const mapDispatch = dispatch => ({
  deleteUser: userId => dispatch(removeSingleUserDb(userId)),
  fetchSingleUser: userId => dispatch(getSingleUserDb(userId)),
  updateSingleUser: (userId, update) =>
    dispatch(updateSingleUserDb(userId, update))
})

export default connect(mapState, mapDispatch)(EditUser)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {UserForm} from '../components'
import {getSingleUserDb, updateSingleUserDb} from '../store/singleUser'
import {NotAdmin} from '../components'

export class SingleUser extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      payment: '',
      validated: false,
      city: '',
      state: '',
      zipcode: null,
      update: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    //when you load up the page, look at the url route
    // if (
    //   this.props.user.id === this.props.params.match.userId ||
    //   this.props.user.admin
    // ) {
    this.props.fetchSingleUser(this.props.match.params.userId)

    // }

    //if your user id !== route userId -> NO ACCESS
    //if you are not an admin either -> NO ACCESS
    //otherwise, populate
    // this.props.fetchSingleUser(this.props.user.id)
    let user = this.props.user
    this.setState({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      address: user.address || '',
      payment: user.payment || '',
      validated: false,
      update: true
    })
  }

  handleSubmit = event => {
    // const [validated, setValidated] = React.useState(false)
    console.log(this.state)
    console.log(this.props.match.params.userId)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    // we need to set order fuilfilled to true in backend
    // also clear the local storage
    this.props.updateSingleUser(this.props.match.params.userId, this.state)
    this.setState({validated: true})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    let user = this.props.user

    if (
      this.props.user.id === +this.props.match.params.userId ||
      this.props.user.admin
    ) {
      user = this.props.singleUser
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
            <UserForm
              user={this.state}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
            {/* add buttons to edit/delete account
            view/display based on admin rights or customer user-id */}
          </div>
        </div>
      )
    } else {
      user = this.props.user
      return <NotAdmin />
    }
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
  fetchSingleUser: userId => dispatch(getSingleUserDb(userId)),
  updateSingleUser: (userId, update) =>
    dispatch(updateSingleUserDb(userId, update))
})

export default connect(mapState, mapDispatch)(SingleUser)

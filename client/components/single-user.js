import React, {Component} from 'react'
import {connect} from 'react-redux'
import {UserForm} from '../components'

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
    const user = this.props.user
    console.log('mount', user)

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
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    // we need to set order fuilfilled to true in backend
    // also clear the local storage
    this.setState({validated: true})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

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
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, null)(SingleUser)

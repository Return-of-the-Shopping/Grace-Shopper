import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, name, isAdmin} = props
  console.log(props)
  if (isAdmin) {
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <h1>hello</h1>
        <Link to="/profile">Profile</Link>
        <Link to="/users">All Users</Link>
      </div>
    )
  } else {
    return <h1>hello</h1>
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    isAdmin: state.user.admin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import {Navbar as NavBar, Nav, Form, Button, FormControl} from 'react-bootstrap'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <NavBar className="main-nav" bg="dark" variant="dark">
      <NavBar.Brand href="#home">Hoppy Endings</NavBar.Brand>
      <Nav className="mr-auto">
        {isLoggedIn ? (
          <div>
            {/* The NavBar will show these links after you log in */}
            <NavLink to="/home">Home</NavLink>
            <a href="/" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </div>
        )}
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </NavBar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

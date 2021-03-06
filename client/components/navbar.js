import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, Link} from 'react-router-dom'
import {logout} from '../store'
import {Navbar as NavBar, Nav} from 'react-bootstrap'
import Badge from '@material-ui/core/Badge'
import cart from '../cart'

const Navbar = ({handleClick, isLoggedIn, userId, isAdmin}) => (
  <div>
    <NavBar className="main-nav" bg="light" variant="light">
      <NavBar.Brand>
        <Link to="/home" className="logo">
          Hoppy Endings
        </Link>
      </NavBar.Brand>
      <Nav className="mr-auto">
        <NavLink to="/home" activeClassName="selected">
          Home
        </NavLink>
        <NavLink to="/products" activeClassName="selected">
          Products
        </NavLink>
      </Nav>
      {isLoggedIn ? (
        <Nav className="nav-right">
          {/* The NavBar will show these links after you log in */}
          {isAdmin && (
            <NavLink to="/users" activeClassName="selected">
              Customers
            </NavLink>
          )}

          <NavLink to={`/users/${userId}`} activeClassName="selected">
            Profile
          </NavLink>
          <NavLink to="#" onClick={handleClick}>
            Logout
          </NavLink>
        </Nav>
      ) : (
        <Nav className="nav-right">
          <NavLink to="/login" activeClassName="selected">
            Login
          </NavLink>
          <NavLink to="/signup" activeClassName="selected">
            Signup
          </NavLink>
        </Nav>
      )}
      <Badge badgeContent={Object.keys(cart).length} color="primary">
        <NavLink to="/cart" activeClassName="selected" className="cart">
          Cart
        </NavLink>
      </Badge>
    </NavBar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      cart.clear()
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

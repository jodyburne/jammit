import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import api from '../../api'
import {
  FaThumbtack,
  FaMapMarkedAlt,
  FaSignOutAlt,
  FaSignInAlt,
  FaUser,
  FaHome,
} from 'react-icons/fa'

function Navbar(props) {
  function handleLogoutClick(e) {
    api.logout()
  }

  return (
    <div class="common-navbar App-footer">
      <NavLink to="/" exact>
        <div className="navLinkElements">
          <FaHome className="navLinkIcon" /> <p>Home</p>
        </div>
      </NavLink>
      {api.isLoggedIn() && (
        <NavLink to="/user">
          <div className="navLinkElements">
            <FaUser className="navLinkIcon" /> <p>Profile</p>
          </div>
        </NavLink>
      )}
      {api.isLoggedIn() && (
        <NavLink to="/boards">
          <div className="navLinkElements">
            <FaThumbtack className="navLinkIcon" /> <p>Boards</p>
          </div>
        </NavLink>
      )}
      {api.isLoggedIn() && (
        <NavLink to="/places-map">
          <div className="navLinkElements">
            <FaMapMarkedAlt className="navLinkIcon" /> <p>Explore</p>
          </div>
        </NavLink>
      )}
      {!api.isLoggedIn() && (
        <NavLink to="/login">
          <div className="navLinkElements">
            <FaSignInAlt className="navLinkIcon" /> <p>Login</p>
          </div>
        </NavLink>
      )}
      {api.isLoggedIn() && (
        <NavLink to="/" onClick={e => handleLogoutClick(e)}>
          <div className="navLinkElements">
            <FaSignOutAlt className="navLinkIcon" /> <p>Logout</p>
          </div>
        </NavLink>
      )}
    </div>
  )
}

export default withRouter(Navbar)

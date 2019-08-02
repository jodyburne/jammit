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

  if (!api.isLoggedIn()) {
    return <></>
  }

  let pageUrl = window.location.href
  console.log(pageUrl)

  return (
    <div class="common-navbar App-footer">
      {((pageUrl.includes('user') ||
        pageUrl.includes('boards') ||
        pageUrl.includes('login') ||
        pageUrl.includes('places') ||
        pageUrl.includes('user')) && (
        <NavLink to="/" exact>
          <div className="navLinkElements">
            <FaHome className="navLinkIcon" /> <p>Home</p>
          </div>
        </NavLink>
      )) || (
        <NavLink to="/" exact>
          <div className="navLinkSwitchedColors">
            <FaHome className="navLinkIcon" /> <p>Home</p>
          </div>
        </NavLink>
      )}

      {api.isLoggedIn() &&
        ((!pageUrl.includes('user') && (
          <NavLink to="/user">
            <div className="navLinkElements">
              <FaUser className="navLinkIcon" /> <p>Profile</p>
            </div>
          </NavLink>
        )) ||
          (pageUrl.includes('user') && (
            <NavLink to="/user">
              <div className="navLinkSwitchedColors">
                <FaUser className="navLinkIcon" /> <p>Profile</p>
              </div>
            </NavLink>
          )))}

      {api.isLoggedIn() &&
        ((!pageUrl.includes('boards') && (
          <NavLink to="/boards">
            <div className="navLinkElements">
              <FaThumbtack className="navLinkIcon" /> <p>Boards</p>
            </div>
          </NavLink>
        )) ||
          (pageUrl.includes('boards') && (
            <NavLink to="/boards">
              <div className="navLinkSwitchedColors">
                <FaThumbtack className="navLinkIcon" /> <p>Boards</p>
              </div>
            </NavLink>
          )))}

      {!api.isLoggedIn() &&
        ((!pageUrl.includes('login') && (
          <NavLink to="/login">
            <div className="navLinkElements">
              <FaSignInAlt className="navLinkIcon" /> <p>Login</p>
            </div>
          </NavLink>
        )) ||
          (pageUrl.includes('login') && (
            <NavLink to="/login">
              <div className="navLinkElements">
                <FaSignInAlt className="navLinkIcon" /> <p>Login</p>
              </div>
            </NavLink>
          )))}

      {api.isLoggedIn() &&
        ((!pageUrl.includes('places') && (
          <NavLink to="/places-map">
            <div className="navLinkElements">
              <FaMapMarkedAlt className="navLinkIcon" /> <p>Explore</p>
            </div>
          </NavLink>
        )) ||
          (pageUrl.includes('places') && (
            <NavLink to="/places-map">
              <div className="navLinkSwitchedColors">
                <FaMapMarkedAlt className="navLinkIcon" /> <p>Explore</p>
              </div>
            </NavLink>
          )))}

      {api.isLoggedIn() &&
        ((!pageUrl.includes('logout') && (
          <NavLink to="/" onClick={e => handleLogoutClick(e)}>
            <div className="navLinkElements">
              <FaSignOutAlt className="navLinkIcon" /> <p>Logout</p>
            </div>
          </NavLink>
        )) ||
          (pageUrl.includes('logout') && (
            <NavLink to="/" onClick={e => handleLogoutClick(e)}>
              <div className="navLinkSwitchedColors">
                <FaSignOutAlt className="navLinkIcon" /> <p>Logout</p>
              </div>
            </NavLink>
          )))}
    </div>
  )
}

export default withRouter(Navbar)

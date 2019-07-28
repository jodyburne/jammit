import React, { Component } from 'react'
import { Route, Link, NavLink, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import AddCountry from './pages/AddCountry'
import Login from './pages/Login'
import Signup from './pages/Signup'
import api from '../api'
import logo from '../logo.svg'
import Boards from './pages/Boards'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
    }
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MERN Boilerplate</h1>
          <NavLink to="/" exact>
            Home
          </NavLink>          
          <NavLink to="/boards">Boards</NavLink>
          <NavLink to="/countries">Countries</NavLink>
          <NavLink to="/user">Profile</NavLink>
          <NavLink to="/add-country">Add country</NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && (
            <Link to="/" onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
          <NavLink to="/secret">Secret</NavLink>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/boards" component={Boards} />
          <Route path="/user" component={Profile} />
          <Route path="/add-country" component={AddCountry} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />

          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    )
  }
}

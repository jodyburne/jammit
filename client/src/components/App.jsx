import React, { Component } from 'react'
import { Route, Link, NavLink, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Requests from './pages/Requests'
import Login from './pages/Login'
import Signup from './pages/Signup'
import api from '../api'
import Boards from './pages/Boards'
import AdDetail from './pages/AdDetail'
import CreateAd from './pages/CreateAd'
import Place from './pages/Place'
import Wanted from './pages/Wanted'
import ShowOff from './pages/ShowOff'
import MyPosts from './pages/MyPosts'

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
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/boards" exact component={Boards} />
          <Route path="/myBoards" exact component={MyPosts} />
          <Route path="/boards/:advertId" component={AdDetail} />
          <Route path="/postjam" component={CreateAd} />
          <Route path="/postwanted" component={Wanted} />
          <Route path="/showOff" component={ShowOff} />
          <Route path="/places-map" component={Place} />
          <Route path="/user" component={Profile} />
          <Route path="/edit-user" component={EditProfile} />
          <Route path="/request" component={Requests} />
          {/*           <Route path="/add-country" component={AddCountry} />
           */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
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
import Navbar from './pages/Navbar'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="page">
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
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
        <Navbar className="common-navbar App-footer" />
      </div>
    )
  }
}

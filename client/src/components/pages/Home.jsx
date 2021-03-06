import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import api from '../../api'

export default class Home extends Component {
  render() {
    const styles = {
      color: 'black',
      textDecoration: 'none',
    }
    return (
      <div className="Home">
        <br />
        {!api.isLoggedIn() && (
          <div>
            <div className="green-background">
              <img
                className="logo"
                src="https://res.cloudinary.com/marianacloud/image/upload/v1564709992/jammit/jammit_logo_o4cokc.png"
              />
              <Link to="/login">
                <p className="press-login">Login</p>
              </Link>
            </div>
            <h1 className="jammitTitle animation-colors">Jammit</h1>
          </div>
        )}

        {api.isLoggedIn() && (
          <div>
            <h1>
              <Link to="/boards" style={styles}>
                Notice Board
              </Link>
            </h1>
            <div className="notices">
              <Row>
                <Col md="4">
                  <div className="homeCard">
                    <div>
                      <Link to="/boards">
                        <img
                          src="https://www.hellomonaco.com/wordpress/wp-content/uploads/2017/05/star-606487.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div>
                      <h3>Wanted</h3>
                      <p>Looking for a drummer?</p>
                      <p>Selling a guitar?</p>
                      <p>Here's the place.</p>
                    </div>
                  </div>
                </Col>
                <Col md="4">
                  <div className="homeCard">
                    <div>
                      <Link to="/boards">
                        <img
                          src="https://timedotcom.files.wordpress.com/2019/03/john-lennon-yoko-ono-lie-in-bed-in.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div>
                      <h3>Show Off</h3>
                      <p>Find new songs.</p>
                      <p>Advertise your gig.</p>
                      <p>Shameless self-promotion found here.</p>
                    </div>
                  </div>
                </Col>
                <Col md="4">
                  <div className="homeCard">
                    <div>
                      <Link to="/boards">
                        <img
                          src="https://www.sundaypost.com/wp-content/uploads/sites/13/2016/10/32645439-e1477047783982.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div>
                      <h3>Jams</h3>
                      <p>Need a place to practise?</p>
                      <p>Or people to practise with?</p>
                      <p>Meet up to jam.</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <h1>
              <Link style={styles} to="/places-map">
                Explore
              </Link>
            </h1>
            <div className="homeCard">
              <div>
                <Link to="/places-map">
                  <img src="https://i.stack.imgur.com/8ZOGS.jpg" alt="" />
                </Link>
              </div>

              <div>
                <h3>Discover</h3>
                <p>Find jam spots in your city</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

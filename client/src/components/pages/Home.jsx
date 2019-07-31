import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';

export default class Home extends Component {
  render() {
    return (
 <div className="Home">
    <h1><Link to='/boards'>Notice Board</Link></h1>
    <div className='notices'>
    <Row >
      <Col md='4'>
      <div className='homeCard'> 
        <div>  
          <Link to="/boards">
          <img  src="https://t4.ftcdn.net/jpg/00/75/85/41/240_F_75854194_TOPxmbnwSwgf93uRzSEcRWSm3sr4pBz8.jpg" alt=""/>
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
     <Col md='4' > 
     <div className='homeCard'> 

        <div>
        <Link to="/boards">
        <img src="https://i.guim.co.uk/img/media/ce0a1ef91b2b55ffc79d002c939c0505337968c2/0_101_2866_1720/master/2866.jpg?width=300&quality=85&auto=format&fit=max&s=729adedb142f0841d6eb701c4b423c10" alt=""/>
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
        <Col md='4' > 
         <div className='homeCard'> 
        <div>
        <Link to="/boards">
        <img src="https://www.sundaypost.com/wp-content/uploads/sites/13/2016/10/32645439-e1477047783982.jpg" alt=""/>
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
        <h1><Link to='/places-map'>Explore
        </Link></h1>
        <div className='homeCard'> 
        <div>
        <Link to="/places-map">
        <img  src="https://i.stack.imgur.com/8ZOGS.jpg" alt=""/>
      </Link>
      </div>
      
      <div>
         <h3>Discover</h3>
         <p>Find jam spots in your city</p>
      </div>
        </div>
       </div>  
      
    )
  }
}

import React, { Component } from 'react'
import api from '../../api'
import { InputGroup, InputGroupAddon, InputGroupText, Input, 
Button, Form, FormGroup, Label, FormText  } from 'reactstrap';
import { Link } from 'react-router-dom'


export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      password: '',
      message: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    }
    api
      .signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push('/') // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup w-75 m-auto">
      <br/>
        <h2>Signup</h2>
        
 <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
         <InputGroup>
        <Input placeholder="david@bowie.com" 
            type="text"
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
        />
      </InputGroup>
      </FormGroup>
       <FormGroup>
          <Label for="exampleEmail">Name</Label>
         <InputGroup>
        <Input placeholder="Ziggy" 
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleInputChange}
        />
      </InputGroup>
      </FormGroup>
      
         <FormGroup>
          <Label for="exampleEmail">Password</Label>
         <InputGroup>
        <Input placeholder="********" 
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
        />
      </InputGroup>
      </FormGroup>
            
          
          <br />
          <Button className='filter-button' onClick={e => this.handleClick(e)}>Signup</Button>
        </Form>
<br/>
        <p> Already have an account? <Link to='/login'>Login</Link> </p>

       
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    )
  }
}

import React, { Component } from 'react'
import api from '../../api'
import { InputGroup, InputGroupAddon, InputGroupText, Input, 
Button, Form, FormGroup, Label, FormText  } from 'reactstrap';
import { Link } from 'react-router-dom'


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
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
    api
      .login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push('/') // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login w-75 m-auto" >
        <h2>Welcome back!</h2>
       <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
         <InputGroup>
        <InputGroupAddon addonType="append">@</InputGroupAddon>
        <Input placeholder="david@bowie.com" 
            type="text"
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
        />
      </InputGroup>
      </FormGroup>
      <br />
         
         <FormGroup>
          <Label for="exampleEmail">Password</Label>
         <InputGroup>
        <InputGroupAddon addonType="append">*</InputGroupAddon>
        <Input placeholder="********" 
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
        />
      </InputGroup>
      </FormGroup>
            
          
          <br />
          <Button onClick={e => this.handleClick(e)}>Login</Button>
        </Form>

        <br/>
        <p> Don't have an account? <Link to='/signup'>Sign up</Link> </p>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    )
  }
}

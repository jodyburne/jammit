import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../../api'
import { Link } from 'react-router-dom'


export default function Wanted(props) {



const [wanted, setWanted] = useState({
  title: '',
  description: '',
  imageURL: null,
  advertType: 'wanted',
})

  function handleInputChange(e) {
    setWanted({
      ...wanted,
      [e.target.name]: e.target.value
    })
  
  }

  function handleClickWanted(e) {
 
    const uploadData = {
      title: wanted.title,
      description: wanted.description,
     imageURL: wanted.imageURL,
     advertType: wanted.advertType
    }

    api.
     addAd(uploadData)
      .then(ad => {
      props.history.push('/boards')
      })
      .catch(err => console.log(err))
  }

     
  
    return (
      <div>
      <h1> wanted</h1>
      
<div className="btn-group btn-group-toggle" data-toggle="buttons">
  <label className="btn btn-secondary ">
    <input type="radio" name="options" id="option1" autoComplete="off" /> <Link to='/postjam'>Jam</Link>
  </label>
  <label className="btn btn-secondary active">
    <input type="radio" name="options" id="option2" autoComplete="off" defaultChecked/> <Link to='/postwanted'>Wanted</Link>
  </label>
  <label className="btn btn-secondary">
    <input type="radio" name="options" id="option3" autoComplete="off"/> <Link to='/showOff'> Show Off </Link>
  </label>
</div>

      <Form>
        <FormGroup>
          <Label for="title">Who or what do you need?</Label> <br/>
          <Input type="title" onChange={handleInputChange} name="title" id="title" placeholder="Charismatic frontman needed" />
        </FormGroup>
        <FormGroup>
          <Label for="description">Tell us more</Label>  <br/>
          <Input type="textarea"  onChange={handleInputChange} name="description" id="description" placeholder="must be goodlooking with some singing experience" />
        </FormGroup>
        <FormGroup>
          <Label for="photo">Upload a photo</Label>  <br/>
          <Input type="file" onChange={handleInputChange}  name="imageURL" id="photo" />
        </FormGroup>
     
        <Button onClick={e => handleClickWanted(e)}> Create </Button>
      </Form>
      
      </div>
    );
  }
 
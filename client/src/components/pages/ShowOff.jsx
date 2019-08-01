import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../../api'
import { Link } from 'react-router-dom'


export default function ShowOff(props) {

const [showOff, setShowOff] = useState({
  title: '',
  description: '',
  imageURL: null,
})

  function handleInputChange(e) {
    setShowOff({
      ...showOff,
      [e.target.name]: e.target.value
    })
  
  }

  function handleClickShowOff(e) {
 
    const uploadData = {
      title: showOff.title,
      description: showOff.description,
     imageURL: showOff.imageURL,
  
    }

    api.
     addAd(uploadData)
      .then(showOff => {
      props.history.push('/boards')
      })
      .catch(err => console.log(err))
  }

     
  
    return (
      <div>
      <h1> showOff</h1>
      
<div className="btn-group btn-group-toggle" data-toggle="buttons">
  <label className="btn btn-secondary ">
    <input type="radio" name="options" id="option1" autoComplete="off" /> <Link to='/postjam'>Jam</Link>
  </label>
  <label className="btn btn-secondary ">
    <input type="radio" name="options" id="option2" autoComplete="off" defaultChecked/> <Link to='/postwanted'> Wanted</Link>
  </label>
  <label className="btn btn-secondary active">
    <input type="radio" name="options" id="option3" autoComplete="off"/> <Link to='/showOff'>Show Off </Link>
  </label>
</div>

      <Form>
      <FormGroup>
          <Label for="title">What do you want to show off?</Label> <br/>
          <Input type="title" onChange={handleInputChange} name="title" id="title" placeholder="late night jam" />
        </FormGroup>
        <FormGroup>
          <Label for="description">Tell us more</Label>  <br/>
          <Input type="textarea"  onChange={handleInputChange} name="description" id="description" placeholder="any news? your latest song? share it here" />
        </FormGroup>
        <FormGroup>
          <Label for="photo">Upload a photo</Label>  <br/>
          <Input type="file" onChange={handleInputChange}  name="imageURL" id="photo" />
        </FormGroup>
     
        <Button onClick={e => handleClickShowOff(e)}> Create </Button>
      </Form>
      
      </div>
    );
  }
 
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
      
      <Button ><Link to='/postjam'>Jam</Link></Button>
      <Form>
        <FormGroup>
          <Label for="title">Title</Label> <br/>
          <Input type="title" onChange={handleInputChange} name="title" id="title" placeholder="Charismatic frontman needed" />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>  <br/>
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
 
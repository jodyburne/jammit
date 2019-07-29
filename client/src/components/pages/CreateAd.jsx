import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../../api'


export default function CreateAd(props) {

const [jam, setJam] = useState({
  title: '',
  description: '',
  location: '',
  imageURL: null,
  advertType: 'jam'
})

  function handleInputChange(e) {
    setJam({
      ...jam,
      [e.target.name]: e.target.value
    })
  
  }

  function handleClickJam(e) {
 
    const uploadData = {
      title: jam.title,
      description: jam.description,
      location: jam.location,
     imageURL: jam.imageURL,
     advertType: jam.advertType
    }

    api.
     addAd(uploadData)
      .then(ad => {
      props.history.push('/boards')
      })
      .catch(err => console.log(err))
  }

     
  
    return (
      <Form>
        <FormGroup>
          <Label for="title">Title</Label> <br/>
          <Input type="title" onChange={handleInputChange} name="title" id="title" placeholder="late night jam" />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>  <br/>
          <Input type="textarea"  onChange={handleInputChange} name="description" id="description" placeholder="bring your instruments to my place" />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>  <br/>
          <Input type="location"  onChange={handleInputChange} name="location" id="location" placeholder='Santos'/>
        </FormGroup>
        <FormGroup>
          <Label for="photo">Upload a photo</Label>  <br/>
          <Input type="file" name="file" id="photo"/>
        </FormGroup>
        <FormGroup check>
          <Label check>  <br/>
            <Input type="checkbox" />{' '}
           I have instruments available
          </Label>
        </FormGroup>
        <Button onClick={e => handleClickJam(e)}> Create </Button>
      <pre>{JSON.stringify(jam, null, 2)}</pre>
      </Form>
    );
  }

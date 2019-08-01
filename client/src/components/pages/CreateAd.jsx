import React, {useState, DatePicker} from 'react';
import { Button, Form, FormGroup, Label, Input  } from 'reactstrap';
import api from '../../api'
import { Link } from 'react-router-dom'


export default function CreateAd(props) {



const [jam, setJam] = useState({
  title: '',
  description: '',
  location: '',
  imageURL: null,
  advertType: 'jam',
  date: new Date(),
  time: '19:00',

})

const [instruments, setInstruments] = useState([])

  function handleInputChange(e) {
    setJam({
      ...jam,
      [e.target.name]: e.target.value
    })
  
  }

function handleAddField(e) {

    let values
  values = [...instruments]
  values.push('')
setInstruments(values)
 
  }

  function handleRemoveField(i, e) {
   

let values = []
values = [...instruments]
values.splice(i, 1)
setInstruments(values)
  }

function handleEnter(e) {
  if (e.keyCode === 13){
      let values
  values = [...instruments]
  values.push(e.target.value)
setInstruments(values)
e.target.value = ''
  }
}

  function handleClickJam(e) {
 
    const uploadData = {
      title: jam.title,
      description: jam.description,
      location: jam.location,
     imageURL: jam.imageURL,
     advertType: jam.advertType,
    date: jam.date,
    time: jam.time,
    instruments: instruments
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
      
      <h1>new jam</h1>


<div className="btn-group btn-group-toggle" data-toggle="buttons">
  <label className="btn btn-secondary active">
    <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked/> <Link to='/postwanted'>Jam</Link>
  </label>
  <label className="btn btn-secondary">
    <input type="radio" name="options" id="option2" autoComplete="off"/> <Link to='/postwanted'>Wanted</Link>
  </label>
  <label className="btn btn-secondary">
    <input type="radio" name="options" id="option3" autoComplete="off"/> <Link to='/showOff'> Show Off </Link>
  </label>
</div>



      <Form>
        <FormGroup>
          <Label for="title">Title</Label> <br/>
          <Input type="title" onChange={handleInputChange} name="title" id="title" placeholder="late night jam" />
        </FormGroup>
        <FormGroup>
          <Label for="description">what how why?</Label>  <br/>
          <Input type="textarea"  onChange={handleInputChange} name="description" id="description" placeholder="bring your instruments to my place" />
        </FormGroup>
        <FormGroup>
          <Label for="location">Where? </Label>  <br/>
          <Input type="location"  onChange={handleInputChange} name="location" id="location" placeholder='Santos'/>
        </FormGroup>

   <FormGroup>  
   <Label for='date'>When?</Label> <br/>   
  <Input type='date' name='date' onChange={handleInputChange} />
   </FormGroup>     
 <FormGroup>     
  <Input type='time' name='time' onChange={handleInputChange} />
   </FormGroup> 
        <FormGroup>
          <Label for="photo">Upload a photo</Label>  <br/>
          <Input type="file" onChange={handleInputChange}  name="file" id="photo" />
        </FormGroup>

        <FormGroup check>
          <Label check>  <br/>
            <Input type="checkbox" />{' '}
           I have instruments available
          </Label>
        </FormGroup>
        <ul>
{instruments.map((instru, i) =>
<li key={i}>{instru} </li>
)}
</ul>
      <FormGroup>
          <Label for="instruments">Instruments:</Label>
          <Button type="button" id="instruments"onClick={e => handleAddField(e)} />+
          {instruments.map((item, i) => (
            <FormGroup key={`${item}-${i}`}>
              <Input
               onKeyDown={e => handleEnter(e)} 
                type="text"
                name="instruments"
                id="instruments"
                //value={item}
                onChange={handleInputChange}
              />
              <Button
                type="button"
                id="instruments"
                onClick={e => handleRemoveField(i, e)}
              />
              X
            </FormGroup>
          ))}
        </FormGroup>


        <Button onClick={e => handleClickJam(e)}> Create </Button>
      </Form>
      
      </div>
    );
  }

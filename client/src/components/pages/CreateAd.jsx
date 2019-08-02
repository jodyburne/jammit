import React, { useState, DatePicker } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
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
    specific: '',
  })

  const [instruments, setInstruments] = useState([])
  const [currentInstru, setCurrentInstru] = useState('')

  function handleInputChange(e) {
    setJam({
      ...jam,
      [e.target.name]: e.target.value,
    })
  }

  function handleInstruChange(e) {
    setCurrentInstru(e.target.value)
  }

  function handleAddField(e) {
    let values
    values = [...instruments]
    values.push(currentInstru)
    setInstruments(values)
    setCurrentInstru('')
  }

  function handleRemoveField(i, e) {
    let values = []
    values = [...instruments]
    values.splice(i, 1)
    setInstruments(values)
  }

  function handleEnter(e) {
    if (e.keyCode === 13) {
      let values
      values = [...instruments]
      values.push(e.target.value)
      setInstruments(values)
      setCurrentInstru(' ')
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
        instruments: instruments,
        specific: jam.specific,
      }

      api
        .addAd(uploadData)
        .then(ad => {
          props.history.push('/boards')
        })
        .catch(err => console.log(err))
    }

    const linkColor = {
      color: 'white',
      textDecoration: 'none',
    }
    return (
      <div className="form-container">
        <br />
        <h4>New Jam</h4>
        <br />
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary active filter-button">
            <input
              type="radio"
              name="options"
              id="option1"
              autoComplete="off"
              defaultChecked
            />{' '}
            <Link style={linkColor} to="/postwanted">
              Jam
            </Link>
          </label>
          <label className="btn btn-secondary filter-button">
            <input
              type="radio"
              name="options"
              id="option2"
              autoComplete="off"
            />{' '}
            <Link style={linkColor} to="/postwanted">
              Wanted
            </Link>
          </label>
          <label className="btn btn-secondary filter-button">
            <input
              type="radio"
              name="options"
              id="option3"
              autoComplete="off"
            />{' '}
            <Link style={linkColor} to="/showOff">
              {' '}
              Show Off{' '}
            </Link>
          </label>
        </div>
        <Form className="gen-form">
          <FormGroup>
            <Label for="title">Title</Label> <br />
            <Input
              type="title"
              onChange={handleInputChange}
              name="title"
              id="title"
              placeholder="late night jam"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">What how why?</Label> <br />
            <Input
              type="textarea"
              onChange={handleInputChange}
              name="description"
              id="description"
              placeholder="bring your instruments to my place"
            />
          </FormGroup>
          <FormGroup>
            <Label for="location">Where? </Label> <br />
            <Input
              type="location"
              onChange={handleInputChange}
              name="location"
              id="location"
              placeholder="Santos"
            />
          </FormGroup>

          <FormGroup>
            <Label for="date">When?</Label> <br />
            <Input type="date" name="date" onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Input type="time" name="time" onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="photo">Upload a photo</Label> <br />
            <Input
              type="file"
              onChange={handleInputChange}
              name="file"
              id="photo"
            />
          </FormGroup>

          <FormGroup check>
            <Label check>
              {' '}
              <br />
              <Input type="checkbox" /> I have these instruments available:
            </Label>
          </FormGroup>
          <ul>
            {instruments.map((instru, i) => (
              <li key={i}>{instru} </li>
            ))}
          </ul>
          <FormGroup>
            <FormGroup>
              <Input
                onKeyDown={e => handleEnter(e)}
                type="text"
                name="instruments"
                id="instruments"
                value={currentInstru}
                onChange={handleInstruChange}
              />
              <Button
                className="filter-button"
                type="button"
                id="instruments"
                onClick={e => handleAddField(e)}
              >
                Add
              </Button>
            </FormGroup>
          </FormGroup>

          <FormGroup>
            <Label for="specific">Specific time and location details</Label>{' '}
            <p className="text-muted">
              These details will only be shared with other users after your
              approval.{' '}
            </p>
            <Input
              type="textarea"
              onChange={handleInputChange}
              name="specific"
              id="specific"
              placeholder="Come to my garage in Rua da Rosa 5. Buzz for Flores."
            />
          </FormGroup>
        </Form>
        <Button className="filter-button" onClick={e => handleClickJam(e)}>
          {' '}
          Create{' '}
        </Button>
        <br /> <br />
      </div>
    )
  }
}

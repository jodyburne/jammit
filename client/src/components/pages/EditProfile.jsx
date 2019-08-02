import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Form, Button, FormGroup, Label, Input, FormText } from 'reactstrap'
import { Link } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState({})
  const [file, setFile] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api
      .getProfile()
      .then(user => {
        setUser(user)
      })
      .then(setIsLoading(false))
  }, [])

  function handleAddField(e) {
    let values
    switch (e.target.id) {
      case 'links':
        values = [...user.links]
        values.push('')
        setUser({ ...user, links: values })
        break

      case 'gear':
        values = [...user.gear]
        values.push('')
        setUser({ ...user, gear: values })
        break

      case 'skills':
        values = [...user.skills]
        values.push('')
        setUser({ ...user, skills: values })
        break
      default:
    }
  }

  function handleRemoveField(i, e) {
    let values = []
    switch (e.target.id) {
      case 'links':
        values = [...user.links]
        values.splice(i, 1)
        setUser({ ...user, links: values })
        break

      case 'gear':
        values = [...user.gear]
        values.splice(i, 1)
        setUser({ ...user, gear: values })
        break

      case 'skills':
        values = [...user.skills]
        values.splice(i, 1)
        setUser({ ...user, skills: values })
        break
      default:
    }
  }

  function handleInputChange(e) {
    let inputField = e.target
    let value
    if (inputField.type === 'checkbox') {
      value = inputField.checked
    } else {
      value = inputField.value
    }

    setUser({
      ...user,
      [inputField.name]: value,
    })
  }

  function handleDynamicInput(e, indexToChange) {
    let inputField = e.target
    setUser({
      ...user,
      links: user.links.map((link, i) => {
        if (i !== indexToChange) return link
        else return inputField.value
      }),
    })
  }

  function handleSkills(e, indexToChange) {
    let inputField = e.target
    setUser({
      ...user,
      skills: user.skills.map((skill, i) => {
        if (i !== indexToChange) return skill
        else return inputField.value
      }),
    })
  }

  function handleGear(e, indexToChange) {
    let inputField = e.target
    setUser({
      ...user,
      gear: user.gear.map((gear, i) => {
        if (i !== indexToChange) return gear
        else return inputField.value
      }),
    })
  }

  function handleInputFile(e) {
    setFile(e.target.files[0])
  }

  function handleSubmit(e) {
    e.preventDefault()

    const profilePic = new FormData()
    profilePic.append('file', file)

    api
      .updateProfile(user)
      .then(result => {
        setUser(result)
        /* setMessage(`Profile Updated`) */
        /* setTimeout(() => {
          setMessage(null)
        }, 2000) */
      })
      .catch(err => setUser({ message: err.toString() }))

    api
      .updatePicture(profilePic)
      .then(result => {
        setUser(result)
        /* setMessage('Profile Updated')
        setTimeout(() => {
          setMessage(null)
        }, 2000) */
      })
      .catch(err => setUser({ message: err.toString() }))
  }

  return (
    <div className="boards">
      <br />
      {
        <div>
          <h4 className="text-left">Edit Profile</h4>
          <br />
          <Form onSubmit={handleSubmit} className="gen-form">
            <FormGroup>
              <Label for="exampleName">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={user.name}
                placeholder="George Harrison"
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">Profile Picture</Label>
              <Input
                type="file"
                name="profilePic"
                id="exampleFile"
                onChange={handleInputFile}
              />
            </FormGroup>
            <FormText>Example help text that remains unchanged.</FormText>
            <FormGroup>
              <Label for="bio">Bio</Label>
              <Input
                type="textarea"
                name="bio"
                id="bio"
                value={user.bio}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup check>
              <Label check />
              <Input
                type="checkbox"
                onChange={handleInputChange}
                name="jamSpot"
                checked={user.jamSpot}
              />{' '}
              I have a jam spot
            </FormGroup>
            <FormText color="muted" className="muted-text-box ">
              Check if you have your own jam place and you're open to invite
              friends to it
            </FormText>
            <FormGroup>
              <Label for="links">More about me:</Label>
              <Button
                className="form-button"
                type="button"
                id="links"
                onClick={e => handleAddField(e)}
              >
                +
              </Button>
              {user.links &&
                user.links.map((link, i) => (
                  <FormGroup key={i} className="input-form-group">
                    <Input
                      type="text"
                      name="links"
                      id="links"
                      placeholder="my soundcloud url..."
                      value={link}
                      onChange={e => handleDynamicInput(e, i)}
                    />
                    <Button
                      className="form-button"
                      type="button"
                      id="links"
                      onClick={e => handleRemoveField(i, e)}
                    >
                      x
                    </Button>
                  </FormGroup>
                ))}
            </FormGroup>
            <FormGroup>
              <Label for="gear">Personal Gear:</Label>
              <Button
                className="form-button"
                type="button"
                id="gear"
                onClick={e => handleAddField(e)}
              >
                +{' '}
              </Button>
              {user.gear &&
                user.gear.map((item, i) => (
                  <FormGroup key={i} className="input-form-group">
                    <Input
                      type="text"
                      name="gear"
                      id="gear"
                      value={item}
                      onChange={e => handleGear(e, i)}
                    />
                    <Button
                      className="form-button"
                      type="button"
                      id="gear"
                      onClick={e => handleRemoveField(i, e)}
                    >
                      x
                    </Button>
                  </FormGroup>
                ))}
            </FormGroup>
            <FormGroup>
              <Label for="skills">Musical skills:</Label>
              <Button
                className="form-button"
                type="button"
                id="skills"
                onClick={e => handleAddField(e)}
              >
                +{' '}
              </Button>
              {user.skills &&
                user.skills.map((skill, i) => (
                  <FormGroup key={i} className="input-form-group">
                    <Input
                      type="text"
                      name="skills"
                      id="skills"
                      value={skill}
                      onChange={e => handleSkills(e, i)}
                    />
                    <Button
                      type="button"
                      id="skills"
                      className="form-button"
                      onClick={e => handleRemoveField(i, e)}
                    >
                      x
                    </Button>
                  </FormGroup>
                ))}
            </FormGroup>
            <Button className="filter-button">Submit</Button>{' '}
          </Form>
        </div>
      }

      {/* message && <div className="info">{message}</div> */}
    </div>
  )
}

import React, { useState } from 'react'
import api from '../../api'
import { Form, Button, FormGroup, Label, Input, FormText } from 'reactstrap'

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [file, setFile] = useState()
  const [message, setMessage] = useState('')
  const [links, setLinks] = useState(user.links)
  const [gear, setGear] = useState(user.gear)
  const [skills, setSkills] = useState(user.skills)

  function handleAddField(e) {
    let values
    switch (e.target.id) {
      case 'links':
        values = [...links]
        values.push('')
        setLinks(values)
        break

      case 'gear':
        values = [...gear]
        values.push('')
        setGear(values)
        break

      case 'skills':
        values = [...skills]
        values.push('')
        setSkills(values)
        break
    }
  }

  function handleRemoveField(i, e) {
    let values = []
    switch (e.target.id) {
      case 'links':
        values = [...links]
        values.splice(i, 1)
        setLinks(values)
        break

      case 'gear':
        values = [...gear]
        values.splice(i, 1)
        setGear(values)
        break

      case 'skills':
        values = [...skills]
        values.splice(i, 1)
        setSkills(values)
        break
    }
  }

  function handleInputChange(e) {
    let inputField = e.target
    setUser({
      ...user,
      [inputField.name]: inputField.value,
    })
  }

  function handleInputFile(e) {
    setFile(e.target.files[0])
  }

  function handleSubmit(e) {
    e.preventDefault()

    const profileData = new FormData()
    profileData.append('file', file)
    profileData.append('name', user.name)
    profileData.append('bio', user.bio)
    profileData.append('links', user.links)
    profileData.append('gear', user.gear)
    profileData.append('skills', user.skills)
    profileData.append('jamSpot', user.jamSpot)

    api
      .updateProfile(profileData)
      .then(result => {
        setUser(result)
        setMessage(`Profile Updated`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
      .catch(err => setUser({ message: err.toString() }))
  }

  return (
    <div className="Edit Profile">
      <h2>User</h2>
      <Form onSubmit={handleSubmit}>
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
            name="text"
            id="bio"
            value={user.bio}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Label check>
          <Input type="checkbox" /> I have a jam spot
        </Label>
        <FormText color="muted">
          Check if you have your own jam place and you're open to invite friends
          to it
        </FormText>

        <FormGroup>
          <Label for="links">Mora about me:</Label>
          <Button type="button" id="links" onClick={e => handleAddField(e)} />+
          {links.map((link, i) => (
            <FormGroup key={`${link}-${i}`}>
              <Input
                type="text"
                name="links"
                id="links"
                value={link}
                placeholder="my soundcloud url..."
                onChange={handleInputChange}
              />
              <Button
                type="button"
                id="links"
                onClick={e => handleRemoveField(i, e)}
              />
              X
            </FormGroup>
          ))}
        </FormGroup>

        <FormGroup>
          <Label for="gear">Personal Gear:</Label>
          <Button type="button" id="gear" onClick={e => handleAddField(e)} />+
          {gear.map((item, i) => (
            <FormGroup key={`${item}-${i}`}>
              <Input
                type="text"
                name="gear"
                id="gear"
                value={item}
                onChange={handleInputChange}
              />
              <Button
                type="button"
                id="gear"
                onClick={e => handleRemoveField(i, e)}
              />
              X
            </FormGroup>
          ))}
        </FormGroup>

        <FormGroup>
          <Label for="skills">Musical skills:</Label>
          <Button type="button" id="skills" onClick={e => handleAddField(e)} />+
          {skills.map((skill, i) => (
            <FormGroup key={`${skill}-${i}`}>
              <Input
                type="text"
                name="skills"
                id="skills"
                value={skill}
                onChange={handleInputChange}
              />
              <Button
                type="button"
                id="skills"
                onClick={e => handleRemoveField(i, e)}
              />
              X
            </FormGroup>
          ))}
        </FormGroup>

        <Button>Submit</Button>
      </Form>
      {message && <div className="info">{message}</div>}
    </div>
  )
}

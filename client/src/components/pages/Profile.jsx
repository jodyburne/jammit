import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  useEffect(() => {
    api.getProfile().then(user => {
      setUser(user)
    })
  }, [])

  return (
    <div className="Profile">
      <h2>User</h2>
      {
        <div>
          <p>{user.name}</p>
          <img src={user.profilePic} />
          <p>{user.bio}</p>
          <p>{user.links}</p>
          <p>{user.jamSpot}</p>
          <p>{user.gear}</p>
          <p>{user.skills}</p>
        </div>
      }
    </div>
  )
}

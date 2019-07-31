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
      {
        <div>
          <img src={user.profilePic} className="profilePicture" />
          <div className="profileBackgroundSquare">
            <div className="profileText">
              <h3>{user.name}</h3>
              <p>{user.bio}</p>
              <p>Gear:</p>
              {user.gear.map(item => (
                <span className="profile-badge">{item}</span>
              ))}
              <p>Skills:</p>
              {user.skills.map(item => (
                <span className="profile-badge">{item}</span>
              ))}
              <p>{user.jamSpot && 'I have a jam spot!'}</p>
              <p>{user.links.length > 0 && 'More about me:'}</p>
              {user.links.map(item => (
                <span className="profile-badge">{item}</span>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

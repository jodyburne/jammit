import React, { useState, useEffect } from 'react'
import api from '../../api'
import { FaEdit } from 'react-icons/fa'
import { FaRegPaperPlane } from 'react-icons/fa'

import { Link } from 'react-router-dom'

export default function Profile(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  console.log(props.user)

  useEffect(() => {
    api.getProfile().then(user => {
      setUser(user)
    })
  }, [])

  // return <div className="Profile">Test</div>

  return (
    <div className="Profile">
      {
        <div>
          <div className="profileBackgroundSquare">
            <Link to="/edit-user">
              <FaEdit className="editButton" />
            </Link>

            <Link to="/request">
              <FaRegPaperPlane className="inboxButton" />
            </Link>
            <img src={user.profilePic} className="profilePicture" />
            <div className="profileText">
              <h3>{user.name}</h3>
              <p>{user.bio}</p>
              <p>Gear:</p>
              {user.gear.map((item, i) => (
                <span className="profile-badge" key={i}>
                  {item}
                </span>
              ))}
              <p>Skills:</p>
              {user.skills.map((item, i) => (
                <span className="profile-badge" key={i}>
                  {item}
                </span>
              ))}
              <p>{user.jamSpot && 'I have a jam spot!'}</p>
              <p>{user.links.length > 0 && 'More about me:'}</p>
              {user.links.map((item, i) => (
                <span className="profile-badge" key={i}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

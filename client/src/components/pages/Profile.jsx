import React, { useState, useEffect } from 'react'
import api from '../../api'
import { FaEdit } from 'react-icons/fa'
import { FaRegPaperPlane } from 'react-icons/fa'

import { Link } from 'react-router-dom'

export default function Profile(props) {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let userId = props.match.params.userId
    if (userId) {
      api.getAnotherProfile(userId).then(user => {
        setUser(user)
      })
    } else {
      api.getProfile().then(user => {
        setUser(user)
      })
    }
  }, [])

  return (
    <div className="Profile">
      {
        <div>
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
                <p className="animation-colors">
                  {user.jamSpot && 'I have a jam spot!'}
                </p>

                <p>{user.gear && user.gear.length > 0 && 'Gear:'} </p>
                <div className="badge-wrapper">
                  {user.gear &&
                    user.gear.map((item, i) => (
                      <span className="profile-badge" key={i}>
                        {item}
                      </span>
                    ))}
                </div>

                <p>{user.skills && user.skills.length > 0 && 'Skills:'}</p>
                <div className="badge-wrapper">
                  {user.skills &&
                    user.skills.map((item, i) => (
                      <span className="profile-badge" key={i}>
                        {item}
                      </span>
                    ))}
                </div>

                <p>{user.links && user.links.length > 0 && 'More about me:'}</p>
                <div className="badge-wrapper">
                  {user.links &&
                    user.links.map((item, i) => (
                      <div className="profile-badge" key={i}>
                        {item}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

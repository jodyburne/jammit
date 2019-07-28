import React, { useState } from 'react'
import api from '../../api'

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(typeof user[0])

  return (
    <div className="Profile">
      <h2>User</h2>
      {
        <div>
          <p>{user.name}</p>
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

import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Button } from 'reactstrap'

export default function Requests() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    api
      .getIncomingRequests()
      .then(requests => {
        setRequests(requests)
      })
      .catch(err => console.log(err))
  }, [])

  function handleChange(e) {
    let requestId = e.target.id
    let requestApproval = e.target.value

    api
      .handleRequests(requestId, { approval: requestApproval })
      .then(result => {})
  }

  return (
    <div className="Requests">
      <h2>Requests sent to me: </h2>
      {requests.map(request => (
        <div key={request._id}>
          <p>{request._post}</p>
          <p>{request.approval}</p>
          <p>{request._postOwner}</p>
          <p>{request._requester}</p>
          <Button id={request._id} value="Approved" onClick={handleChange} />
          Accept
          <Button id={request._id} value="Denied" onClick={handleChange} /> Deny
        </div>
      ))}
    </div>
  )
}

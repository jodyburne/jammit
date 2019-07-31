import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function Requests() {
  const [requests, setRequests] = useState([])
  const [show, setShow] = useState(false)
  const [request, requestState] = useState({
    requestId: '',
    approval: '',
  })
  const [modal, modalState] = useState({
    message: '',
  })

  function handleShow(e) {
    setShow(true)

    if (e.target.value === 'Approved') {
      modalState({
        message: 'Are you sure you want to approve this request?',
      })
    } else {
      modalState({
        message: 'Are you sure you want to reject this request?',
      })
    }

    requestState({
      requestId: e.target.id,
      approval: e.target.value,
    })
  }

  function handleClose(e) {
    setShow(false)
    if (e.target.value !== 'Cancel') {
      api.handleRequests(request.requestId, {
        approval: request.approval,
      })
    }
  }

  useEffect(() => {
    api.getIncomingRequests().then(requests => {
      setRequests(requests)
    })
  }, [requests])

  return (
    <div className="Requests">
      <h2>Requests sent to me: </h2>
      {requests
        //.filter(request => request.approval === 'Pending')
        .map(request => (
          <div key={request._id}>
            <p>{request._post}</p>
            <p>{request.approval}</p>
            <p>{request._postOwner.name}</p>
            <p>{request._requester}</p>
            <Button id={request._id} value="Approved" onClick={handleShow} />
            Accept
            <Button id={request._id} value="Denied" onClick={handleShow} /> Deny
          </div>
        ))}
      <Modal isOpen={show} toggle={handleClose}>
        <ModalHeader toggle={handleClose}>Pending request</ModalHeader>
        <ModalBody>{modal.message}</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            value="Cancel"
            onClick={e => handleClose(e)}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleClose}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

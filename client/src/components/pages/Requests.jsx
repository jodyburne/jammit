import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

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

  function handleShow(approval, requestId) {
    setShow(true)

    if (approval === 'Approved') {
      modalState({
        message: 'Are you sure you want to approve this request?',
      })
    } else {
      modalState({
        message: 'Are you sure you want to reject this request?',
      })
    }

    requestState({
      requestId: requestId,
      approval: approval,
    })
  }

  function handleClose(e) {
    setShow(false)
    if (e.target.value !== 'Cancel') {
      api
        .handleRequests(request.requestId, {
          approval: request.approval,
        })
        .then(() => {
          api.getIncomingRequests().then(requests => {
            setRequests(requests)
          })
        })
    }
  }

  useEffect(() => {
    api.getIncomingRequests().then(requests => {
      setRequests(requests)
    })
  }, [])

  console.log(requests)

  return (
    <div className="boards">
      <br />
      <h4 className="text-left">Requests: </h4>
      <div>
        {requests
          .filter(request => request.approval === 'Pending')
          .map(request => (
            <div className="smaller-card" key={request._id}>
              <Link to={'/user/' + request._requester._id}>
                <img
                  src={
                    request._requester.profilePic ||
                    'https://pbs.twimg.com/profile_images/1457290066/amy1000_400x400.jpg'
                  }
                />
              </Link>

              <div className="smaller-card-text">
                <p>{request._requester.name}</p>
                <p>{request._post.title}</p>
                <p>{request.approval}</p>
              </div>
              <div className="smaller-card-request-buttons">
                <Button onClick={() => handleShow('Approved', request._id)}>
                  <FaCheck className="approveIcon" />
                </Button>
                <Button onClick={() => handleShow('Denied', request._id)}>
                  <FaTimes className="removeIcon" />
                </Button>
              </div>
            </div>
          ))}
      </div>
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

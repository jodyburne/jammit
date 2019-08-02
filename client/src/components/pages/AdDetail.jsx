import React, { useEffect, useState } from 'react'
import api from '../../api'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'

export default function AdDetail(props) {
  const adId = props.match.params.advertId
  const [show, setShow] = useState(false)
  const [comments, setComments] = useState([])
  const [detail, setDetail] = useState(null)
  const [currentComment, setCurrentComment] = useState('')
  let currentUser =  api.getLocalStorageUser()._id
  let postOwner = detail && detail._user._id
     console.log('users', currentUser, postOwner, detail, currentUser && (
      currentUser !== postOwner && (
        detail && detail.advertType === 'jam')))
        
  useEffect(() => {
    api.getAdDetail(adId).then(data => {
      setDetail(data.ad)
      if (data.comments) {
        setComments(data[1])
      }
    })
  }, [])

  function toggle() {
    setShow(true)
  }

  function handleModal(e) {
    setShow(false)
    if (e.target.value !== 'Cancel') {
      let message = document.querySelector('#messageToSend').value
      api.createRequest(adId, message)
    }
  }

  function handleInputChange(e) {
    setCurrentComment(e.target.value)
  }

  function handleSubmit(e) {
    let values
    values = [...comments]
    values.push(currentComment)
    setComments(values)

    const uploadData = { content: currentComment }
    api
      .addComment(uploadData, adId)
      .then(createdComment => {
        setComments([...comments, createdComment])
        setCurrentComment('')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="detailMain">
      {detail && (
        <div>
          {' '}
          <br />
          <h5> {detail.title} </h5> <br />
          <div className="adDetailCard">
            <div>
              <br />
              <img src={detail.imageURL} alt="" />
            </div>
            <div>
              <p>{detail.description}</p>
            </div>
            {detail.location && (
              <div>
                <p>
                  <b>Where: </b> {detail.location}
                </p>
              </div>
            )}

            {detail.date && (
              <div>
                <p>
                  <b>Date: </b>
                  {new Date(detail.date).toLocaleDateString()}
                </p>
              </div>
            )}

            {detail.advertType === 'jam' && (
              <Button className="filter-button" onClick={toggle}>
                Request to Join
              </Button>
            )}
            {detail.advertType === 'wanted' && (
              <Button className="filter-button">Contact</Button>
            )}
            <br />
          </div>
          <br />
          <div>
            <h5> Comments: </h5>

            {comments &&
              comments.map((com, i) => (
                <div className="comment" key={i}>
                  <div>
                    <img src={com.creatorImg} alt="" />
                  </div>
                  <div>
                    <p className="text-center">
                      {com.postedBy ? com.postedBy : com.userEmail}
                    </p>
                    <p className="text-muted"> {com.content} </p>
                  </div>
                </div>
              ))}
            <br />

            <Form className="postComment">
              <FormGroup>
                <Label for="content">Add a comment</Label>
                <Input
                  type="textarea"
                  onChange={handleInputChange}
                  value={currentComment}
                  name="content"
                  id="content"
                  type="text"
                  maxLength="10"
                  placeholder="Questions? Post here!"
                />
              </FormGroup>
              <Button className="filter-button" onClick={e => handleSubmit(e)}>
                Submit
              </Button>
            </Form>
            <br />
          </div>
        </div>
      )}

      <Modal isOpen={show} toggle={handleModal}>
        <ModalHeader toggle={handleModal}>Send request</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                type="textarea"
                name="messageToSend"
                id="messageToSend"
                placeholder="I would love to join your place! Pls send me more info. Thanks."
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            value="Cancel"
            onClick={e => handleModal(e)}
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleModal}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

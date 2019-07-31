import React, {useEffect, useState} from "react";
import api from '../../api';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function AdDetail(props){
  const adId = props.match.params.advertId

const [comments, setComments] = useState([])
const [detail, setDetail] = useState(null)
const [currentComment, setCurrentComment] = useState('')


  useEffect(() => {
    api.getAdDetail(adId).then(data => {
      setDetail(data[0])
      if (data[1]){
      setComments(data[1])}

    })
  }, [])

function handleInputChange(e) {
    setCurrentComment(e.target.value)
  }

function handleSubmit(e){
  let values
  values = [...comments]
  values.push(currentComment)
setComments(values)


const uploadData = {content: currentComment}
api.
     addComment(uploadData, adId)
      .then(createdComment => {
        setComments([...comments, createdComment])
        setCurrentComment('')
      })
      .catch(err => console.log(err))


}

  return (
    <div>
    {detail && (
    <div>
    <h1> {detail.title} </h1>
    <div >
    <img src={detail.imageURL} height="100" alt=""/>
    <p>{detail.description}</p>
    </div>

    <div>
    <h2> Comments </h2>
    
    {comments && (
    comments.map(
      com => 
      <div> 
      <h4>{com.postedBy ? com.postedBy : com.userEmail}</h4>
      <img src={com._creatorImg}/>
      <h5> {com.content} </h5>
      </div> 
    )
    )}

    <Form>
     <FormGroup>
          <Label for="content">Add a comment</Label>
          <Input type="textarea" onChange={handleInputChange} value={currentComment} name="content" id="content" placeholder="You have questions?  Post a comment here." />
        </FormGroup>
      <Button onClick={e => handleSubmit(e)} >Submit</Button>
    </Form>
    </div>
    </div>
    )}
  </div>
  )
}
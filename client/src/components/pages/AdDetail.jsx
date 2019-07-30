import React, {useEffect, useState} from "react";
import api from '../../api';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function AdDetail(props){
  const adId = props.match.params.advertId

const [comments, setComments] = useState(null)

   const [detail, setDetail] = useState(null)
  useEffect(() => {
    api.getAdDetail(adId).then(data => {
      setDetail(data[0])
      if (data[1]){
      setComments(data[1])}
    console.log(data)
      // setComments(data.comments)
      // console.log('comments', comments)
    })
  }, [])

// function handleSubmit(e){
//   console.log('WERKING NOW')
//   let values
//   values = [...comments]
//   values.push(e.target.value)
// setComments(values)
// e.target.value = ''
// console.log('comms', comments)

// const uploadData

// api.
//      addAd(uploadData)
//       .then(ad => {
//       props.history.push('/boards')
//       })
//       .catch(err => console.log(err))

// }

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
      <h3>{com.postedBy ? com.postedBy : com.userEmail}</h3>
      <img src={com._creatorImg}/>
      <p> {com.content} </p>
      </div> 
    )
    )}

    <Form>
     <FormGroup>
          <Label for="exampleText">Add a comment</Label>
          <Input type="textarea" name="text" id="exampleText" placeholder="You have questions?  Post a comment here." />
        </FormGroup>
      <Button >Submit</Button>
    </Form>
    </div>
    </div>
    )}
  </div>
  )
}
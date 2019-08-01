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
    <div className='detailMain'>
    {detail && (
    <div> <br/>
    <h5> {detail.title} </h5> <br/>
    <div className='adDetailCard'>
     <div>
     <img src={detail.imageURL} height="100" alt=""/>
     </div>
     <div >
    <p>{detail.description}</p>
     </div>
    {detail.location && 
     <div >
    <p><b>Where:   </b> {detail.location}</p>
    </div> }

    {detail.date && 
    <div >
    <p><b>Date: </b>{new Date(detail.date).toLocaleDateString()}</p>
    </div> }

   {detail.advertType === 'jam' && 
   <Button className='filter-button'>Request to Join</Button>
   }
    {detail.advertType === 'wanted' && 
   <Button className='filter-button'>Contact</Button>
   }


   </div>
<br/>
    <div>
    <h5> Comments: </h5>
    
    {comments && (
    comments.map(
      (com, i) => 
      <div className='comment'  key={i}> 
      <div>
      <img height='120px'src={com.creatorImg} alt=''/>
      </div>
      <div>
      <p className='text-center'>{com.postedBy ? com.postedBy : com.userEmail}</p>
      <p className='text-muted'>   {com.content} </p>
      </div>
      </div> 
      
    )
    )}
    <br/>

    <Form  className='postComment'>
     <FormGroup>
          <Label for="content">Add a comment</Label>
          <Input type="textarea" onChange={handleInputChange} value={currentComment} name="content" id="content" placeholder="You have questions?  Post a comment here." />
        </FormGroup>
      <Button className='filter-button' onClick={e => handleSubmit(e)} >Submit</Button>
    
    </Form><br/>
    </div>
    </div>
    )}
  </div>
  )
}
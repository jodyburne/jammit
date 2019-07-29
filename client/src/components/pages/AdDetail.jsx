import React, {useEffect, useState} from "react";
import api from '../../api';

export default function AdDetail(props){
  const adId = props.match.params.advertId
  console.log('I HOPE I WERK', adId)
   const [detail, setDetail] = useState(null)
  useEffect(() => {
    api.getAdDetail(adId).then(data => {
      setDetail(data)
    })
  }, [])
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
    {detail.comments && (
    detail.comments.map(
      com => 
      <div> 
      <h3>{com._user.name}</h3>
      <img src={com._user.profilePic}/>
      <p> {com.text} </p>
      </div> 
    )
    )}
    </div>
    </div>
    )}
  </div>
  )
}
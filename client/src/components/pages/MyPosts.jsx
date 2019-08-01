import React, {useState, useEffect} from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import {  Button, Row, Col  } from 'reactstrap';
import { FaDrum,  FaMicrophoneAlt, FaSearchengin} from 'react-icons/fa'

export default function MyPosts (props) {
  const [state, setState] = useState({
    search: '',
    jamsChecked: true,
    wantedChecked: true,
    showOffChecked: true
  })

  const [boards, setBoards] = useState([])
  useEffect(() => {
    api.getMyBoards().then(boards => {
      setBoards(boards)
    })
  }, [])


function handleDelete(i, e) {
  let adId = e.target.name
    api
      .deletePost(adId)
      .then(ad => {
        console.log('AD', ad)
        let values = [...boards]
        values.splice(i, 1)
         setBoards(values)
        props.history.push('/myBoards')

      })
      .catch(err => console.log(err))
  }



 function filterBySearch(board) {
    return (
      board.title.toUpperCase().includes(state.search.toUpperCase())
    )
  }

function filterType(board){
  return (
    (state.jamsChecked && board.advertType === 'jam') ||
     (state.wantedChecked && board.advertType === 'wanted') ||
     (state.showOffChecked && board.advertType ==='showOff')

  )
}
const iconColor = {
  color: '#14a7a8'
}

// , FaSearch, FaMicrophoneAlt, FaSearchengin



  return  (
    <div className='boards'>
    <br/>
    <h4 className='text-left'> My Posts</h4>
    <br/>
    


<Row>
{boards
.filter(board => 
  filterBySearch(board) &&
  filterType(board)
)
.map((board, i) => (
  <Col key={i} md='4'>
  <div className='noticeCard text-left' >
   <Link
  to={"/boards/" + board._id}>
  
  <br/>
<img src={board.imageURL} alt=""/>
</Link>
<h3>   { 
board.advertType === 'jam' &&
  <FaDrum style={iconColor}/>
  }
  {board.advertType === 'wanted' &&
  <FaSearchengin style={iconColor}/>
  } 
   {board.advertType === 'showOff' &&
  <FaMicrophoneAlt style={iconColor}/>
  } 
  {'   ' + board.title}
</h3>
<p>{board.description}</p>
 <Button className='filter-button' name={board._id} onClick={e => handleDelete(i, e)}>
         Delete
       </Button>

 </div>
 </Col> 
 
))}
</Row>

 <Link to='/postjam'> <button  className="circular-fixed-bottom-right-button"></button></Link>


    </div>
  )
}
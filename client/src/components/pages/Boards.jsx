import React, {useState, useEffect} from 'react'
import api from '../../api'
import { Link, Redirect } from 'react-router-dom'
import { InputGroup, InputGroupAddon, InputGroupText, Input, 
Button, Form, FormGroup, Label, FormText, Container, Row, Col  } from 'reactstrap';


export default function Boards () {
  const [state, setState] = useState({
    search: '',
    jamsChecked: true,
    wantedChecked: true,
    showOffChecked: true
  })

  const [boards, setBoards] = useState([])
  useEffect(() => {
    api.getBoards().then(boards => {
      setBoards(boards)
    })
  }, [])

function handleChange(e) {
    setState({...state,
    [e.target.name]: 
    e.target.type === "checkbox" ? e.target.checked : e.target.value})
   
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




  return  (
    <div className='boards'>
    
    <h4 className='text-left'> Notice Board</h4>
    <InputGroup className='board-search'>
        <InputGroupAddon  addonType="prepend">?</InputGroupAddon>
        <Input 
      type="text"
      className="search-bar "
      placeholder="new tune"
      name="search"
      value={state.search}
      onChange={handleChange}
        />
      </InputGroup>
 
   <br/>


<div className="btn-group searchButton btn-group-toggle" data-toggle="buttons">
   
<label name="jamsChecked" className=" btn active filter-button btn-primary">
   <input
          type="checkbox"
          name="jamsChecked"
          checked={state.jamsChecked}
          onChange={handleChange}
          className='searchButtonEach'
        
        /> Jams
  </label>
   

 <label name="wantedChecked" className=" btn active filter-button btn-primary">
   <input
          type="checkbox"
          name="wantedChecked"
          checked={state.wantedChecked}
          onChange={handleChange}
          className='searchButtonEach'

        /> Wanted
  </label>
   

  <label name="showOffChecked" className=" btn active filter-button btn-primary">
   <input
          type="checkbox"
          name="showOffChecked"
          checked={state.showOffChecked}
          onChange={handleChange}
         className='searchButtonEach'

        /> Show Off
  </label>
   
</div>


<Row>
{boards
.filter(board => 
  filterBySearch(board) &&
  filterType(board)
)
.map((board, i) => (
  <Col md='4'>
  <div className='noticeCard text-left' key={i}>
   <Link
  to={"/boards/" + board._id}>
  {board.advertType === 'jam' &&
  <h4>JAM</h4>
  }
  {board.advertType === 'wanted' &&
  <h4>WANTED</h4>
  }
  {board.advertType === 'showOff' &&
  <h4>SHOW OFF</h4>
  }
<img src={board.imageURL} alt=""/>
</Link>
<h3>{board.title}</h3>
{board.location && 
<h5 className='text-muted'>{board.location}</h5>
}

</div>
 </Col> 
 
)
)}
</Row>
 <Link to='/postjam'> <button  className="circular-fixed-bottom-right-button"></button></Link>
    </div>
  )
}
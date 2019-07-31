import React, {useState, useEffect} from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import { InputGroup, InputGroupAddon, InputGroupText, Input, 
Button, Form, FormGroup, Label, FormText  } from 'reactstrap';

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
    <div>
    <Button><Link to='/postjam'>Post your own </Link></Button>
    <h1>Notice Board</h1>
    <InputGroup>
        <InputGroupAddon addonType="append">?</InputGroupAddon>
        <Input 
      type="text"
      className="search-bar"
      placeholder="new tune"
      name="search"
      value={state.search}
      onChange={handleChange}
        />
      </InputGroup>
 
   <br/>

 {/*toggle to tag remove active class not working, instead using ternary   */}

<div className="btn-group btn-group-toggle" data-toggle="buttons">
   
  {state.jamsChecked ? <label name="jamsChecked" className="active btn btn-secondary">
  <input
          type="checkbox"
          name="jamsChecked"
          checked={state.jamsChecked}
          onChange={handleChange}
        
        /> Jams
  </label>
   : <label name="jamsChecked" className=" btn btn-secondary">
   <input
          type="checkbox"
          name="jamsChecked"
          checked={state.jamsChecked}
          onChange={handleChange}
        
        /> Jams
  </label>
   } 

  {state.wantedChecked ? <label name="wantedChecked" className="active btn btn-secondary">
  <input
          type="checkbox"
          name="wantedChecked"
          checked={state.wantedChecked}
          onChange={handleChange}
        
        /> wanted
  </label>
   : <label name="wantedChecked" className=" btn btn-secondary">
   <input
          type="checkbox"
          name="wantedChecked"
          checked={state.wantedChecked}
          onChange={handleChange}
        
        /> wanted
  </label>
   }

   {state.showOffChecked ? <label name="showOffChecked" className="active btn btn-secondary">
  <input
          type="checkbox"
          name="showOffChecked"
          checked={state.showOffChecked}
          onChange={handleChange}
        
        /> showOff
  </label>
   : <label name="showOffChecked" className=" btn btn-secondary">
   <input
          type="checkbox"
          name="showOffChecked"
          checked={state.showOffChecked}
          onChange={handleChange}
        
        /> Show Off
  </label>
   }
</div>



{boards
.filter(board => 
  filterBySearch(board) &&
  filterType(board)
)
.map((board, i) => (
 
  <div className='homeCard' key={i}>
   <Link
  to={"/boards/" + board._id}>
<img src={board.imageURL} alt="" height='200'/>
</Link>
<h3>{board.title}</h3>
<p>{board.description}</p>
</div>
  
)
)}
    </div>
  )
}
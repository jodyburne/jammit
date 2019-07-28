import React, {useState, useEffect} from 'react'
import api from '../../api'

export default function Boards () {
  const [state, setState] = useState({
    search: '',
    jamsChecked: true,
    wantedChecked: true,
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
      board.title.toUpperCase().startsWith(state.search.toUpperCase())
    )
  }

function filterType(board){
  return (
    (state.jamsChecked && board.advertType === 'jam') ||
     (state.wantedChecked && board.advertType === 'wanted')

  )
}



  return  (
    <div>
    <h1>Boards</h1>
 <input
      type="text"
      className="search-bar"
      placeholder="new tune"
      name="search"
      value={state.search}
      onChange={handleChange}
   />
   <br/>
<input
          type="checkbox"
          name="jamsChecked"
          checked={state.jamsChecked}
          onChange={handleChange}
        />
        <label>Jams</label>
        <input
          type="checkbox"
          name="wantedChecked"
          checked={state.wantedChecked}
          onChange={handleChange}
        />
        <label>Wanted</label>
{boards.filter(board => 
  filterBySearch(board) &&
  filterType(board)
)
.map((board, i) => (
  <div key={i}>
<img src={board.imageURL} alt="" height='100'/>
<h3>{board.title}</h3>
<p>{board.description}</p>
</div>
)
)}
    </div>
  )
}
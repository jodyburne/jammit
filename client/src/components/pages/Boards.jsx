import React, { useState, useEffect } from 'react'
import api from '../../api'
import { Link, Redirect } from 'react-router-dom'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  FormText,
  Container,
  Row,
  Col,
} from 'reactstrap'
import {
  FaDrum,
  FaSearch,
  FaMicrophoneAlt,
  FaSearchengin,
} from 'react-icons/fa'

export default function Boards() {
  const [state, setState] = useState({
    search: '',
    jamsChecked: true,
    wantedChecked: true,
    showOffChecked: true,
  })

  const [boards, setBoards] = useState([])
  useEffect(() => {
    api.getBoards().then(boards => {
      setBoards(boards)
    })
  }, [])

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    })
  }

  function filterBySearch(board) {
    return board.title.toUpperCase().includes(state.search.toUpperCase())
  }

  function filterType(board) {
    return (
      (state.jamsChecked && board.advertType === 'jam') ||
      (state.wantedChecked && board.advertType === 'wanted') ||
      (state.showOffChecked && board.advertType === 'showOff')
    )
  }
  const iconColor = {
    color: '#14a7a8',
  }

  // function orderPosts() {

  // }

  return (
    <div className="boards">
      <br />
      <h4 className="text-left"> Notice Board</h4>
      <br />
      <div className="form-group">
        <Input
          type="text"
          className="search-bar "
          placeholder="new tune"
          name="search"
          value={state.search}
          onChange={handleChange}
        />
      </div>
      <br />

      <div
        className="btn-group searchButton btn-group-toggle"
        data-toggle="buttons"
      >
        <label
          name="jamsChecked"
          className={
            state.jamsChecked ? ' btn active filter-button btn-primary' : 'btn'
          }
        >
          <input
            type="checkbox"
            name="jamsChecked"
            checked={state.jamsChecked}
            onChange={handleChange}
            className="searchButtonEach"
          />{' '}
          <FaDrum /> Jams
        </label>

        <label
          name="wantedChecked"
          className={
            state.wantedChecked
              ? ' btn active filter-button btn-primary'
              : 'btn'
          }
        >
          <input
            type="checkbox"
            name="wantedChecked"
            checked={state.wantedChecked}
            onChange={handleChange}
            className="searchButtonEach"
          />
          <FaSearchengin /> Wanted
        </label>

        <label
          name="showOffChecked"
          className={
            state.showOffChecked
              ? ' btn active filter-button btn-primary'
              : 'btn'
          }
        >
          <input
            type="checkbox"
            name="showOffChecked"
            checked={state.showOffChecked}
            onChange={handleChange}
            className="searchButtonEach"
          />{' '}
          <FaMicrophoneAlt /> Show Off
        </label>
      </div>

      <Row>
        {boards
          .filter(board => filterBySearch(board) && filterType(board))
          .map((board, i) => (
            <Col key={i} md="4">
              <div className="noticeCard">
                <Link to={'/boards/' + board._id}>
                  <br />
                  <img src={board.imageURL} alt="" />
                </Link>
                <h6>
                  {' '}
                  {board.advertType === 'jam' && <FaDrum style={iconColor} />}
                  {board.advertType === 'wanted' && (
                    <FaSearchengin style={iconColor} />
                  )}
                  {board.advertType === 'showOff' && (
                    <FaMicrophoneAlt style={iconColor} />
                  )}
                  {'   ' + board.title}
                </h6>
                {board.location && (
                  <h7 className="text-muted">{board.location}</h7>
                )}
              </div>
            </Col>
          ))}
      </Row>
      <Link to="/postjam">
        {' '}
        <button className="circular-fixed-bottom-right-button" />
      </Link>
    </div>
  )
}

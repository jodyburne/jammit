import React from 'react'
import Map from './Map'
import PlaceCard from './PlaceCard'
import axios from 'axios'

export default function Place() {
  var request = {
    query: 'jam sessions',
    fields: ['name', 'geometry'],
  }

  return (
    <div>
      <Map request={request} />
    </div>
  )
}

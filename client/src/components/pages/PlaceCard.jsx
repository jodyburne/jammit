import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap'

export default function PlaceCard(place) {
  return (
    <Card>
      <CardImg
        top
        width="100%"
        src={
          (place.photos && place.photos[0] && place.photos[0].getUrl()) ||
          'https://i.ytimg.com/vi/1bPtyCqc19o/maxresdefault.jpg'
        }
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle>{place.name || 'Default Name'}</CardTitle>
        <CardSubtitle>{place.vicinity || 'Default Location'}</CardSubtitle>
        <CardText />
        <Button>More</Button>
      </CardBody>
    </Card>
  )
}

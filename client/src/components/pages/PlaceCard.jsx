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

export default function PlaceCard(props) {
  // console.log(number)
  let className = 'singleCard'
  if (props.isMap) {
    className += ' single-single'
  }
  return (
    <Card className={className}>
      <CardImg
        top
        width="100%"
        src={
          (props.photos && props.photos[0] && props.photos[0].getUrl()) ||
          'https://i.ytimg.com/vi/1bPtyCqc19o/maxresdefault.jpg'
        }
        alt="Card image cap"
      />
      <CardBody>
        {/*  <CardTitle>{place.name || 'Default Name'}</CardTitle>
        <CardSubtitle>{place.vicinity || 'Default Location'}</CardSubtitle> */}
        <CardText>
          <p>{props.name || 'Default Name'}</p>
          <p>{props.vicinity || 'Default Location'}</p>
        </CardText>
        {/*  <Button>More</Button> */}
      </CardBody>
    </Card>
  )
}

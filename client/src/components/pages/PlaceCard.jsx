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
  return (
    <Card>
      <CardImg
        top
        width="100%"
        src="https://i.ytimg.com/vi/1bPtyCqc19o/maxresdefault.jpg"
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle>{props.content.title}</CardTitle>
        <CardSubtitle>{props.content.vicinity}</CardSubtitle>
        <CardText />
        <Button>More</Button>
      </CardBody>
    </Card>
  )
}

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
        <CardTitle>Card title</CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
        <CardText>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  )
}

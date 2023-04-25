import React from 'react'
import { Card, Button } from 'react-bootstrap'

const ServiceCard = (serviceInfo: any) => {
  return (
    <div className='service-card'>
    <Card border='info'>
      <Card.Header as="h5">Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="info">Details</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default ServiceCard
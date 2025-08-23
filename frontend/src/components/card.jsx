import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap';
import './card.css';
const JobCard = ({job}) => {
  return (
    <>
    <div>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${job?.image}`}/>
      <Card.Body>
        <Card.Title>{job?.title}</Card.Title>
        <Card.Text>
          {job?.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
    </>
  );
}

export default JobCard;

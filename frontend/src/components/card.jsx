import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap';
import './card.css';
import { useNavigate } from 'react-router-dom';
const JobCard = ({job}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/job/${job._id}`);
  };

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
        <Button variant="primary" onClick={handleViewDetails}>view details</Button>
      </Card.Body>
    </Card>
    </div>
    </>
  );
}

export default JobCard;

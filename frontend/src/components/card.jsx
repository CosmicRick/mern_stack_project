import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap';
import './card.css';
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
const JobCard = ({job, ...props}) => {
   const navigate = useNavigate();
=======
import { useNavigate } from 'react-router-dom';
const JobCard = ({job}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/job/${job._id}`);
  };

>>>>>>> 0a9d4f187252d409bb24a22fac0736b1eaf3040a
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
<<<<<<< HEAD
          <button
          className="go-somewhere-btn"
          onClick={() => navigate(`/jobs/${job._id}`)}
          style={{ marginTop: "10px" }}
        >
          Go somewhere
        </button>
=======
        <Button variant="primary" onClick={handleViewDetails}>view details</Button>
>>>>>>> 0a9d4f187252d409bb24a22fac0736b1eaf3040a
      </Card.Body>
    </Card>
    </div>
    </>
  );
}

export default JobCard;

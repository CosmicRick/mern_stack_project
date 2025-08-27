import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from 'react-bootstrap';
import './card.css';
import { useNavigate } from "react-router-dom";
const JobCard = ({job, ...props}) => {
   const navigate = useNavigate();
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
          <button
          className="go-somewhere-btn"
          onClick={() => navigate(`/jobs/${job._id}`)}
          style={{ marginTop: "10px" }}
        >
          Go somewhere
        </button>
      </Card.Body>
    </Card>
    </div>
    </>
  );
}

export default JobCard;

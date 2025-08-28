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
    <Card style={{ width: '18rem', maxHeight: '32rem' }}>
      <Card.Img variant="top" src={`${job?.image}`} style={{ objectFit: 'cover', maxHeight: '10rem' }}/>
      <Card.Body style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Card.Title>{job?.title}</Card.Title>
        <Card.Text style={{ overflow: 'auto', flex: '1' }}>
          {job?.description}
        </Card.Text>
        <div>
          <button
            className="go-somewhere-btn"
            onClick={() => navigate(`/job/${job._id}`)}
            style={{ marginTop: "10px" }}
          >
            Details
          </button>
        </div>
      </Card.Body>
    </Card>
    </div>
    </>
  );
}

export default JobCard;

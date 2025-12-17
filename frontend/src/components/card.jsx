import React from 'react'
import './card.css';
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, ...props }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className='cardvalue'>
        <div className='card'>
          <img 
            className="card-image" 
            src={`${job?.image}`} 
            alt={job?.title || "Job image"}
          />
          <div className='card-content'>
            <h3 className='card-title'>{job?.title}</h3>
            <p className='card-description'>
              {job?.description}
            </p>
            <div>
              <button
                className="go-somewhere-btn"
                onClick={() => navigate(`/job/${job._id}`)}
                style={{ marginTop: "10px" }}
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobCard;
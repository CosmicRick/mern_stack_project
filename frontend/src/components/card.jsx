import React from 'react'
import './card.css';
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, ...props }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className='cardvalue'>
        <div className='car'>
          <img 
            className="car-image" 
            src={`${job?.image}`} 
            alt={job?.title || "Job image"}
          />
          <div className='car-content'>
            <h3 className='car-title'>{job?.title}</h3>
            <p className='car-description'>
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
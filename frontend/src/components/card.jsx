import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';

const JobCard = () => {
  // Simple static data for now
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "New York",
      salary: "$80,000 - $100,000",
      type: "Full-time"
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "DevStudio",
      location: "Remote",
      salary: "$90,000 - $120,000",
      type: "Full-time"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Design Co",
      location: "Los Angeles",
      salary: "$70,000 - $90,000",
      type: "Contract"
    }
  ];

  return (
    <div className="row g-3">
      {jobs.map((job) => (
        <div key={job.id} className="col-md-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
              <Card.Text>
                <small className="text-muted">
                  📍 {job.location}<br />
                  � {job.salary}<br />
                  💼 {job.type}
                </small>
              </Card.Text>
              <Button variant="primary" size="sm">Apply Now</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default JobCard;
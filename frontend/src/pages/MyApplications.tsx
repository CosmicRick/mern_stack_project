import React, { useEffect, useState } from 'react';
import { getMyApplications } from '../services/api';
import { Alert, Spinner, Card } from 'react-bootstrap';

type Application = {
  jobTitle: string;
  company: string;
  location: string;
  status: string;
  appliedOn: string;
  image?: string;   // 🔹 added image
};

const MyApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const response = await getMyApplications();

        // 🔹 Map job image along with other fields
        const mappedApps: Application[] = response.data.map((app: any) => ({
          jobTitle: app.job?.title || 'N/A',
          company: app.job?.company || 'N/A',
          location: app.job?.city || 'N/A',
          status: app.status,
          appliedOn: new Date(app.createdAt).toLocaleDateString(),
          image: app.job?.image || '/default-job.png', // fallback image
        }));

        setApplications(mappedApps);
      } catch (err) {
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, []);

  if (loading) return <Spinner animation="border" className="m-3" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="p-3">
      <h3>My Applications</h3>
      {applications.length === 0 ? (
        <Alert variant="info">No applications found.</Alert>
      ) : (
        <div className="d-flex flex-column gap-3">
          {applications.map((app, index) => (
            <Card key={index} className="shadow-sm border-0 d-flex flex-row align-items-center p-2">
              {/* 🔹 Job image on the left */}
              <img
                src={app.image}
                alt={app.jobTitle}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginRight: '15px' }}
              />

              {/* 🔹 Job details */}
              <Card.Body>
                <Card.Title>{app.jobTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {app.company} — {app.location}
                </Card.Subtitle>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span>
                    <strong>Status:</strong> {app.status}
                  </span>
                  <span>
                    <strong>Applied On:</strong> {app.appliedOn}
                  </span>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;

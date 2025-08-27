import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Form, Alert, Spinner, Container } from 'react-bootstrap';
import { getJobApplications, updateApplicationStatus } from '../services/api';

const statusOptions = ['applied', 'reviewing', 'shortlisted', 'rejected', 'hired'];

const Applications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getJobApplications(jobId);
        setApplications(response.data);
      } catch (err) {
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, { status: newStatus });
      setApplications(prev =>
        prev.map(app =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      setMessage(`Status updated to "${newStatus}"`);
      setTimeout(() => setMessage(''), 3000); // Auto-clear message after 3s
    } catch (err) {
      setMessage('Failed to update status');
    }
  };

  if (loading) return <Spinner animation="border" className="m-3" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Applications for Job ID: {jobId}</h2>
      {message && <Alert variant="info">{message}</Alert>}

      {applications.map((app) => (
        <Card key={app._id} className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Applicant: {app.applicant.name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {app.applicant.email} <br />
              <strong>Role:</strong> {app.applicant.role} <br />
              <strong>Applied At:</strong> {new Date(app.createdAt).toLocaleString()} <br />
              <strong>Current Status:</strong>{' '}
              <span className="badge bg-primary text-capitalize">{app.status}</span>
            </Card.Text>

            <Form.Group controlId={`status-${app._id}`}>
              <Form.Label><strong>Change Status</strong></Form.Label>
              <Form.Select
                value={app.status}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Applications;

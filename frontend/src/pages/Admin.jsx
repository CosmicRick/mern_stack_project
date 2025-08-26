import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

import {
  getAdminJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../services/api"; // ✅ use service file
import JobModal from "./JobModal";
import { useNavigate } from "react-router-dom";

const JobAdminPanel = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Fetch Jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getAdminJobs();
      setJobs(res.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch jobs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateJob(selectedJobId, formData);
      } else {
        await createJob(formData);
      }
      fetchJobs();
      handleCloseModal();
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  // Delete Job
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id);
        fetchJobs();
      } catch (err) {
        setError("Failed to delete job");
      }
    }
  };

  // Open modal for create
  const handleOpenCreate = () => {
    setFormData({});
    setIsEditing(false);
    setShowModal(true);
  };

  // Open modal for edit
  const handleOpenEdit = (job) => {
    setFormData(job);
    setIsEditing(true);
    setSelectedJobId(job._id);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
    setIsEditing(false);
    setSelectedJobId(null);
  };

  const handleViewApplications = (jobId) => {
    // Navigate to the applications page for the specific job
    navigate(`/applications/${jobId}`);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card className="shadow-lg">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Job Management</h4>
              <Button onClick={handleOpenCreate}>+ Add Job</Button>
              
            </Card.Header>

            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {loading ? (
                <div className="d-flex justify-content-center my-5">
                  <Spinner animation="border" />
                </div>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Company</th>
                      <th>City</th>
                      <th>Type</th>
                      <th>Salary</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs?.length > 0 ? (
                      jobs.map((job) => (
                        <tr key={job._id}>
                          <td>{job.title}</td>
                          <td>{job.company}</td>
                          <td>{job.city}</td>
                          <td>{job.type}</td>
                          <td>
                            {job.salaryMin} - {job.salaryMax}
                          </td>
                          <td>
                            <Button
                              variant="warning"
                              size="sm"
                              className="me-2"
                              onClick={() => handleOpenEdit(job)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(job._id)}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleViewApplications(job._id)}
                            >
                              View Applications
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No jobs available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Create / Update */}
      <JobModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
      />
    </Container>
  );
};

export default JobAdminPanel;

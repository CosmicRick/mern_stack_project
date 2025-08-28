import React, { useState, useEffect } from "react";
import "./admin.css";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import {
  getAdminJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../services/api";
import JobModal from "./JobModal";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer/footer";

const JobAdminPanel = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

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


  const handleOpenCreate = () => {
    setFormData({});
    setIsEditing(false);
    setShowModal(true);
  };


  const handleOpenEdit = (job) => {
    setFormData(job);
    setIsEditing(true);
    setSelectedJobId(job._id);
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
    setIsEditing(false);
    setSelectedJobId(null);
  };


  const handleViewApplications = (jobId) => {
    navigate(`/applications/${jobId}`);
  };


  return (
    <div className={`nav-contente ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="mt-4 custom-container">
        <div className="panel shadow-lg rounded-2xl p-6">

          <div className="panel-header flex justify-between items-center mb-4">
            <h4 className="mb-0">Job Management</h4>
            <Button onClick={handleOpenCreate}>+ Add Job</Button>
          </div>


          {error && <Alert>{error}</Alert>}
          {loading ? (
            <div className="d-flex justify-content-center my-5">
              <Spinner animation="border" />
            </div>
          ) : jobs?.length > 0 ? (
            <div className="job-list">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="job-card shadow-md rounded-xl p-4 flex items-start gap-4"
                >
                  {/* Job Image */}
                  {job.image ? (
                    <img
                      src={job.image}
                      alt={job.title}
                      className="job-card-image w-24 h-24 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="job-card-placeholder w-24 h-24 flex items-center justify-center rounded-lg">
                      No Image
                    </div>
                  )}


                  {/* Job Info */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h5 className="mb-2">{job.title}</h5>
                      <p className="mb-1">
                        <strong>Company:</strong> {job.company}
                      </p>
                      <p className="mb-1">
                        <strong>City:</strong> {job.city}
                      </p>
                      <p className="mb-1">
                        <strong>Type:</strong> {job.type}
                      </p>
                      <p className="mb-1">
                        <strong>Salary:</strong> {job.salaryMin} - {job.salaryMax}
                      </p>
                    </div>


                    <div className="d-flex flex-wrap gap-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => handleOpenEdit(job)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleViewApplications(job._id)}
                      >
                        View Applications
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No jobs available</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <JobModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
      />
    </div>
  );
};


export default JobAdminPanel;
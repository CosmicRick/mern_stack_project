import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer/footer";
import { getJobById } from "../services/job.api";
import "./jobs.css";

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = localStorage.getItem("current_theme") || "light";

// Applied state
const [applied, setApplied] = useState(false);

useEffect(() => {
  setLoading(true);
  getJobById(id)
    .then((res) => {
      console.log("Job API response:", res);
      // Try both possible response shapes
      setJob(res.data.job || res.data);
      setLoading(false);
    })
    .catch(() => {
      setError("Failed to load job details.");
      setLoading(false);
    });
}, [id]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!job) return <div>No job found.</div>;


  return (
    <>
    <div className={`nav ${theme}`}>
      <Navbar theme={theme} setTheme={() => {}} />
      <main className="job-details-main">
        <div className="job-details-container">
          <img
            src={job.image || require("../components/assets/jobimage.jpg")}
            alt={job.title}
            className="imagecontent"
            style={{ width: "100%", maxHeight: "320px", objectFit: "cover", borderRadius: "10px" }}
          />
          <h2  className="text-4xl font-bold mb-3">{job.title}</h2>
          <h4  className="text-4xl font-bold mb-3">{job.company}</h4>
          <p>
            <b>City:</b> {job.city} &nbsp; | &nbsp;
            <b>Location:</b> {job.location} &nbsp; | &nbsp;
            <b>Type:</b> {job.type}
          </p>
          <p>
            <b>Expected Salary :</b> {job.salaryMin} - {job.salaryMax}
          </p>
          <div>
            <h5>Description</h5>
            <p>{job.description}</p>
          </div>
          <div>
               <button
    onClick={() => setApplied(true)} // stays Applied after click
    disabled={applied}
    className={`px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${
      applied
        ? "bg-green-500 text-white cursor-not-allowed"
        : "bg-gradient-to-r from-green-600 to-green-800 text-black hover:from-green-800 hover:to-green-900"
    }`}
  >
    {applied ? "Applied" : "Apply Now"}
  </button>
          </div>
          <div>
            <h5>Requirements</h5>
            <ul>
              {Array.isArray(job.requirements)
                ? job.requirements.map((req, idx) => <li key={idx}>{req}</li>)
                : <li>{job.requirements}</li>}
            </ul>
          </div>
        </div>
      </main>
      <Footer theme={theme} setTheme={() => {}} />
    </div>
    </>
  );
};

export default JobDetailsPage;
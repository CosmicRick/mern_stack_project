import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const currentSortBy = params.get("sortBy") || "createdAt";
    const currentSortOrder = params.get("sortOrder") || "desc";

    setSortBy(currentSortBy);
    setSortOrder(currentSortOrder);

    axios
      .get(
        `http://localhost:5000/api/jobs?search=${search}&sortBy=${currentSortBy}&sortOrder=${currentSortOrder}`
      )
      .then((res) => {
        setJobs(res.data.jobs);
      })
      .catch((err) => console.error(err));
  }, [location.search]);

  const handleSortChange = (field) => {
    navigate(`?sortBy=${field}&sortOrder=${sortOrder}`);
  };

  const toggleOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    navigate(`?sortBy=${sortBy}&sortOrder=${newOrder}`);
  };

  return (
    <div>
      <h2>Job Listings</h2>

      {/* Sorting Controls */}
      <div style={{ marginBottom: "15px" }}>
        <label>Sort By: </label>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="createdAt">Newest</option>
          <option value="title">Job Title</option>
          <option value="company">Company</option>
          <option value="city">City</option>
        </select>

        <button onClick={toggleOrder} style={{ marginLeft: "10px" }}>
          {sortOrder === "asc" ? "⬆ Ascending" : "⬇ Descending"}
        </button>
      </div>

      {/* Job List */}
      {jobs.map((job) => (
        <div
          key={job._id}
          style={{ borderBottom: "1px solid #ddd", padding: "10px" }}
        >
          <h3>{job.title}</h3>
          <p>
            {job.company} - {job.city}
          </p>
          <small>Posted: {new Date(job.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Jobs;

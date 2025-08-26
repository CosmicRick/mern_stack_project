import React, { useEffect, useState } from "react";
import './search.css';
import { getUniqueCompanies, getUniqueCities } from "../services/api";

function JobSearchBar({ onSearch }) {
  const [search, setSearch] = useState("");   // job title or keyword
  const [city, setCity] = useState("");       // selected city
  const [company, setCompany] = useState(""); // selected company
  const [companies, setCompanies] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch unique companies & cities from API
  useEffect(() => {
    getUniqueCompanies()
      .then((res) => setCompanies(res.data || []))
      .catch((err) => console.error("Error fetching companies:", err));

    getUniqueCities()
      .then((res) => setCities(res.data || []))
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  const handleSearch = () => {
    // Pass filters to parent (Home.jsx)
    onSearch({ search, city, company });
  };

  return (
    <div className="searchbar-container">
      {/* Job Title / Keyword Input */}
      <input
        type="text"
        placeholder="Job Title or Keyword"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Location Dropdown (Dynamic) */}
      <select
        className="selectbar"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">Select Location</option>
        {cities.map((c, index) => (
          <option key={index} value={c}>{c}</option>
        ))}
      </select>

      {/* Company Dropdown (Dynamic) */}
      <select
        className="selectbar"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      >
        <option value="">Select Company</option>
        {companies.map((comp, index) => (
          <option key={index} value={comp}>{comp}</option>
        ))}
      </select>

      {/* Search Button */}
      <button className="searchbar-button" onClick={handleSearch}>
        🔍 Search Job
      </button>
    </div>
  );
}

export default JobSearchBar;

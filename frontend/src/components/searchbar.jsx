import React from "react";
import './search.css';
function JobSearchBar() {
  return (
    <div className="searchbar-container">
      {/* Job Title / Company Input */}
      <input
        type="text"
        placeholder="Job Title or Company"
        className="search-input" />

      {/* Location Dropdown */}
      <select className="selectbar">
        <option value="" disabled selected hidden>Select Location</option>
        <option value="newyork">New York</option>
        <option value="london">London</option>
        <option value="india">India</option>
      </select>

      {/* Category Dropdown */}
      <select className="selectbar">
        <option value="" disabled selected hidden>Select Category</option>
        <option value="it">IT</option>
        <option value="finance">Finance</option>
        <option value="marketing">Marketing</option>
      </select>

      {/* Search Button */}
      <button className="searchbar-button">
        🔍 Search Job
      </button>
    </div>
  );
}
export default JobSearchBar;

import React, { useState } from 'react';
import './sidebar.css'
function Sidebar() {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [salaryRange, setSalaryRange] = useState([0, 9999]);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    jobTypes: [],
    experienceLevels: [],
    datePosted: [],
    tags: []
  });

  const categories = [
    'Commerce',
    'Telecommunications',
    'Hotels & Tourism',
    'Education',
    'Financial Services',
    'Technology',
    'Healthcare',
    'Real Estate'
  ];

  const jobTypes = ['Full Time', 'Part Time', 'Freelance', 'Seasonal', 'Fixed-Price'];
  const experienceLevels = ['No-experience', 'Fresher', 'Intermediate', 'Expert'];
  const datePostedOptions = ['All', 'Last Hour', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days'];
  const tags = ['engineering', 'design', 'ui/ux', 'marketing', 'management', 'soft', 'construction'];

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleTagClick = (tag) => {
    setSelectedFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(item => item !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="filter-container">
      <div className="filter-section"style={{paddingLeft : '20%'}}>
        <h2 className="section-title">Search by Job Title</h2>
        <div className="search-input">
          <svg className="search-iconf" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4" stroke="#31353dff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input type="text" placeholder="Job title or company" />
        </div>
      </div>

      <div className="filter-section">
        <h3 className="section-label">Location</h3>
        <div className="location-select">
          <svg className="location-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="#383a3dff" strokeWidth="2"/>
            <path d="M10 1c-3.866 0-7 3.134-7 7 0 5.25 7 11 7 11s7-5.75 7-11c0-3.866-3.134-7-7-7z" stroke="#2f3135ff" strokeWidth="2"/>
          </svg>
          <select>
            <option>Choose city</option>
          </select>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="section-label">Category</h3>
        <div className="checkbox-group">
          {categories.slice(0, showMoreCategories ? categories.length : 5).map((category) => (
            <label key={category} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedFilters.categories.includes(category)}
                onChange={() => handleCheckboxChange('categories', category)}
              />
              <span className="checkbox-text">{category}</span>
              <span className="count">0</span>
            </label>
          ))}
        </div>
        <button 
          className="show-more-btn"
          onClick={() => setShowMoreCategories(!showMoreCategories)}
        >
          {showMoreCategories ? 'Show Less' : 'Show More'}
        </button>
      </div>

      <div className="filter-section">
        <h3 className="section-label">Job Type</h3>
        <div className="checkbox-group">
          {jobTypes.map((type) => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedFilters.jobTypes.includes(type)}
                onChange={() => handleCheckboxChange('jobTypes', type)}
              />
              <span className="checkbox-text">{type}</span>
              <span className="count">0</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="section-label">Experience Level</h3>
        <div className="checkbox-group">
          {experienceLevels.map((level) => (
            <label key={level} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedFilters.experienceLevels.includes(level)}
                onChange={() => handleCheckboxChange('experienceLevels', level)}
              />
              <span className="checkbox-text">{level}</span>
              <span className="count">0</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="section-label">Date Posted</h3>
        <div className="checkbox-group">
          {datePostedOptions.map((option) => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedFilters.datePosted.includes(option)}
                onChange={() => handleCheckboxChange('datePosted', option)}
              />
              <span className="checkbox-text">{option}</span>
              <span className="count">0</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="section-label">Salary</h3>
        <div className="salary-slider">
          <input
            type="range"
            min="0"
            max="9999"
            value={salaryRange[0]}
            onChange={(e) => setSalaryRange([parseInt(e.target.value), salaryRange[1]])}
            className="range-input range-min"
          />
          <input
            type="range"
            min="0"
            max="100000"
            value={salaryRange[1]}
            onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
            className="range-input range-max"
          />
        </div>
        <br></br>
        <div className="salary-display">
          <span>Salary: ${salaryRange[0]} - ${salaryRange[1]}</span>
          <button className="applys-btn">Apply</button>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="section-label">Tags</h3>
        <div className="tags-container">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`tag ${selectedFilters.tags.includes(tag) ? 'active' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
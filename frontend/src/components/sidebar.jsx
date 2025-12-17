import React, { useState } from 'react';

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
      <div className="filter-section">
        <h2 className="section-title">Search by Job Title</h2>
        <div className="search-input">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input type="text" placeholder="Job title or company" />
        </div>
      </div>

      <div className="filter-section">
        <h3 className="section-label">Location</h3>
        <div className="location-select">
          <svg className="location-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="#9CA3AF" strokeWidth="2"/>
            <path d="M10 1c-3.866 0-7 3.134-7 7 0 5.25 7 11 7 11s7-5.75 7-11c0-3.866-3.134-7-7-7z" stroke="#9CA3AF" strokeWidth="2"/>
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
              <span className="count">10</span>
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
              <span className="count">10</span>
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
              <span className="count">10</span>
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
              <span className="count">10</span>
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
            max="9999"
            value={salaryRange[1]}
            onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
            className="range-input range-max"
          />
        </div>
        <div className="salary-display">
          <span>Salary: ${salaryRange[0]} - ${salaryRange[1]}</span>
          <button className="apply-btn">Apply</button>
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

const styles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    background: #f5f5f5;
    padding: 20px;
  }

  .filter-container {
    max-width: 360px;
    background: #e8f4f3ff;
    border-radius: 16px;
    padding: 24px;
    margin: 0 auto;
  }

  .filter-section {
    margin-bottom: 28px;
  }

  .section-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #1a1a1a;
  }

  .section-label {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #1a1a1a;
  }

  .search-input {
    position: relative;
    display: flex;
    align-items: center;
    background: white;
    border-radius: 8px;
    padding: 12px 16px;
  }

  .search-icon {
    margin-right: 12px;
  }

  .search-input input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 14px;
    color: #6B7280;
  }

  .search-input input::placeholder {
    color: #9CA3AF;
  }

  .location-select {
    position: relative;
    display: flex;
    align-items: center;
    background: white;
    border-radius: 8px;
    padding: 12px 16px;
  }

  .location-icon {
    margin-right: 12px;
  }

  .location-select select {
    border: none;
    outline: none;
    flex: 1;
    font-size: 14px;
    color: #6B7280;
    background: transparent;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0 center;
    padding-right: 20px;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #374151;
  }

  .checkbox-label input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin-right: 12px;
    cursor: pointer;
    accent-color: #2D9B8E;
  }

  .checkbox-text {
    flex: 1;
  }

  .count {
    color: #9CA3AF;
    font-size: 14px;
  }

  .show-more-btn {
    width: 100%;
    background: #2D9B8E;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 14px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 12px;
    transition: background 0.2s;
  }

  .show-more-btn:hover {
    background: #268277;
  }

  .salary-slider {
    position: relative;
    height: 6px;
    background: #2D9B8E;
    border-radius: 3px;
    margin: 20px 0;
  }

  .range-input {
    position: absolute;
    width: 100%;
    height: 6px;
    top: -3px;
    left: 0;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    pointer-events: none;
  }

  .range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #2D9B8E;
    border: 3px solid white;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .range-input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #2D9B8E;
    border: 3px solid white;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .salary-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #374151;
  }

  .apply-btn {
    background: #2D9B8E;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .apply-btn:hover {
    background: #268277;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    background: #C7E9E5;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 13px;
    color: #2D9B8E;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tag:hover {
    background: #B0DFD9;
  }

  .tag.active {
    background: #2D9B8E;
    color: white;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Sidebar;
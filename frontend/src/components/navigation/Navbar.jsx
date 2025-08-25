import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import logo_day from '../assets/logo-day.png';
import logo_night from '../assets/logo-night.png';
import day from '../assets/day.png';
import night from '../assets/night.png';
import search_w_dark from '../assets/search-w.png';
import search_b_light from '../assets/search-b.png';
import './Navbar.css';

const Navbar = ({ theme, setTheme }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // navigate to jobs page with search param
      window.location.href = `/jobs?search=${searchTerm}`;
    }
  };

  return (
    <div className="navbar">
      <img src={theme === 'light' ? logo_day : logo_night} alt="Logo" className="logo" />
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/jobs">Jobs</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact Us</a></li>

        {/* Search box */}
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" style={{ background: "none", border: "none" }}>
            <img
              src={theme === 'light' ? search_w_dark : search_b_light}
              alt="Search"
              className="search-icon"
            />
          </button>
        </form>

        <img
          onClick={toggle_mode}
          src={theme === 'light' ? day : night}
          alt="toggle theme"
          className="day-mode-icon"
        />
      </ul>
      <div className='login-button'>
        <FontAwesomeIcon
          icon={faCircleUser}
          className="user-icon"
          onClick={() => { window.location.href = '/login'; }}
        />
        <label htmlFor="login">Login</label>
      </div>
      <div className='aibot'>
        <FontAwesomeIcon icon={faRobot} shake size="xs" style={{color: "#63E6BE",}} className='ai-bot-icon' />
        <label htmlFor="aibot">AI Bot</label>
      </div>
    </div>
  );
};

export default Navbar;

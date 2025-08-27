import React, { useState, useEffect } from 'react';
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
  const [user, setUser] = useState(null); // for logged-in user

  // check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // assuming user is stored in localStorage
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user); // change key based on how you store it (e.g., user.username)
    }
  }, []);

  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
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

      {/* Login / Username */}
      <div className='login-button'>
        <FontAwesomeIcon
          icon={faCircleUser}
          className="user-icon"
          onClick={() => { 
            if (!user) {
              window.location.href = '/login'; 
            }else if(user.role==='admin'){
              window.location.href = '/admin';
            }else{
              window.location.href = '/my-applications';
            }
          }}
        />
        
      </div>
<div className='user-info'>
        <FontAwesomeIcon
          icon={faCircleUser}
          className="user-icon"
          onClick={() => {
            if (!user) {
              window.location.href = '/login';
            } else if (user.role === 'admin') {
              window.location.href = '/admin';
            } else {
              window.location.href = '/my-applications';
            }
          }}
        />
      </div>
      {/* AI Bot */}
      <div className='aibot'>
        <FontAwesomeIcon icon={faRobot} shake size="xs" style={{color: "#63E6BE"}} className='ai-bot-icon' />
        <label htmlFor="aibot">Ask AI</label>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRobot } from '@fortawesome/free-solid-svg-icons';
import logo_day from '../assets/logo-day.png';
import logo_night from '../assets/logo-night.png';
import day from '../assets/day.png';
import night from '../assets/night.png';
import search_w_dark from '../assets/search-w.png';
import search_b_light from '../assets/search-b.png';
import './Navbar.css';
import AiModal from '../../pages/aibotModal.jsx';

const Navbar = ({ theme, setTheme }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null); 
  const [showAIModal, setShowAIModal] = useState(false); // <-- added this

  // check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); 
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed.user ? parsed.user : parsed);
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

  const handleLoginClick = () => {
    if (!user) {
      window.location.href = '/login'; 
    } else if (user.role === 'admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/my-applications';
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
      <div className='login-button' onClick={handleLoginClick}>
        <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
        {user && <span className="username">Hi, {user.name}</span>}
      </div>

      {/* AI Bot */}
      <div 
        className="aibot" 
        onClick={() => setShowAIModal(true)}   // whole div clickable
      >
        <FontAwesomeIcon 
          icon={faRobot} 
          shake 
          size="xs" 
          style={{ color: "#63E6BE" }} 
          className='ai-bot-icon' 
        />
        <span className="ask-ai">Ask AI</span>
      </div>

      {/* AI Modal */}
      <AiModal show={showAIModal} handleClose={() => setShowAIModal(false)} />
    </div>
  );
};

export default Navbar;

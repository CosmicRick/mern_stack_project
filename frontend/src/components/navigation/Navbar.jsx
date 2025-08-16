import { Import } from 'lucide-react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'
import logo_day from '../assets/logo-day.png';
import logo_night from '../assets/logo-night.png';
import day from '../assets/day.png';
import night from '../assets/night.png';
import search_w_dark from '../assets/search-w.png';
import search_b_light from '../assets/search-b.png';
const Navbar = () => {
  return (
    <>
      <div className='navbar'>
        <img src={logo_day} alt="Logo" className='logo' />
        <ul>
          <li>
            <a href="home">Home</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <div className='search-box'>
            <input type="text" placeholder='Search...' className='search-input' />
            <img src={search_w_dark} alt="Search" className='search-icon' />
          </div>
          <img src={night} alt="" className='day-mode-icon' />
        </ul>
      </div>
    </>
  )
}
export default Navbar

import React from 'react'
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faGlobe, faBuilding, faUser } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className='row'>
          {/* {collumn1} */}
          <div className='col-mid-3 col-sm-6'>
            <h4><FontAwesomeIcon icon={faBriefcase} /> Job Opportunities</h4>
            <ul className='list-unstyled' style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Browse Jobs</li>
              <li>Post a Job</li>
              <li>Career Tips</li>
              <li>Apply Now</li>
            </ul>
          </div>
          {/* {collumn2} */}
          <div className='col-mid-3 col-sm-6'>
            <h4><FontAwesomeIcon icon={faGlobe} /> Connect with us</h4>
            <ul className='list-unstyled' style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><FontAwesomeIcon icon={faFacebook} /> FaceBook</li>
              <li><FontAwesomeIcon icon={faTwitter} /> Twitter</li>
              <li><FontAwesomeIcon icon={faInstagram} /> Instagram</li>
              <li><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</li>
            </ul>
          </div>
          {/* {collumn3} */}
          <div className='col-mid-3 col-sm-6'>
            <h4><FontAwesomeIcon icon={faBuilding} /> Company</h4>
            <ul className='list-unstyled' style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>About Us</li>
              <li>Our Team</li>
              <li>Partners</li>
              <li>For Employers</li>
            </ul>
          </div>
          {/* {collumn4} */}
          <div className='col-mid-3 col-sm-6'>
            <h4><FontAwesomeIcon icon={faUser} /> Job Categories</h4>
            <ul className='list-unstyled' style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Telecommunications</li>
              <li>Information Technology</li>
              <li>Healthcare</li>
              <li>Finance</li>
            </ul>
          </div>
        </div>
        {/* Footer Bottom */}
          <p className='text-xs-center'>
            &copy;{new Date().getFullYear()} SmartHire Nexus || All Rights Reserved
          </p>
      </div>
    </div>
  )
}
export default Footer;

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
              <li><a href="/jobs" >Browse Jobs</a></li>
              <li><a href="/admin" >Post a Job</a></li>
              <li><a href="/contact" >Career Tips</a></li>
              <li><a href="/jobs" >Apply Now</a></li>
            </ul>
          </div>
          {/* {collumn2} */}
          <div className='col-mid-3 col-sm-6'>
            <h4><FontAwesomeIcon icon={faGlobe} /> Connect with us</h4>
            <ul className='list-unstyled' style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="https://www.facebook.com/sayandip.naskar.16" ><FontAwesomeIcon icon={faFacebook} /> FaceBook</a></li>
              <li><a href="https://x.com/sdvians17" ><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
              <li><a href="https://www.instagram.com/sayandip_naskar18/" ><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
              <li><a href="https://www.linkedin.com/in/sayandip-naskar-9a4031375/" ><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</a></li>
            </ul>
          </div>
          {/* {collumn3} */}
          <div className='col-mid-3 col-sm-6'>
            <h4><FontAwesomeIcon icon={faBuilding} /> Company</h4>
            <ul className='list-unstyled' style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="/about" >About Us</a></li>
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

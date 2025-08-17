import React from 'react'
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className='row'>
          {/* {collumn1} */}
          <div className='col-mid-3 col-sm-6'>
            <h4>lorem ipsum</h4>
            <ul className='list-unstyled'>
              <li></li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
          {/* {collumn2} */}
          <div className='col-mid-3 col-sm-6'>
            <h4>lorem ipsum</h4>
            <ul className='list-unstyled'>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
          {/* {collumn3} */}
          <div className='col-mid-3 col-sm-6'>
            <h4>lorem ipsum</h4>
            <ul className='list-unstyled'>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
          {/* {collumn4} */}
          <div className='col-mid-3 col-sm-6'>
            <h4>lorem ipsum</h4>
            <ul className='list-unstyled'>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className='footer-bottom'>
          <p className='text-xs-center'>
            &copy;{new Date().getFullYear()} SmartHire Nexus || All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  )
}
export default Footer;

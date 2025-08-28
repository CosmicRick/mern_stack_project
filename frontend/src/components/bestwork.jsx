import React from 'react';
import './bestwork.css';
import { CloudMoonRain } from 'lucide-react';
import home from "../components/assets/aboutus1.jpg";
import home1 from "../components/assets/aboutus2.jpg";
import home2 from "../components/assets/aboutus3.jpg";
const BestSection = () => (
  <div className="best-section">
    <div className="best-section-left">
      <div className="big-card card-blur" />
      <div className="column">
        <div className="small-card card-blur" />
        <div className="small-card card-blur" />
      </div>
    </div>
    <div className="best-section-right">  
      <h1 style={{ color: '#1a9761ff' }}>We’re Only Working <br />With The Best</h1>
      <p style={{ color: '#11633fa5' }}>
        Ultricies purus dolor viverra mi laoreet at cursus justo. 
        Ultrices purus diam egestas amet faucibus tempor blandit.
      </p>
      <div className="features">
        <div className="feature-item">
          <span style={{ color: '#c8911cff'}}>🏅Quality Job</span>
        </div>
        <div className="feature-item">
          <span style={{ color: '#dc931dff' }}>📄Resume builder</span>
        </div>
        <div className="feature-item">
          <span style={{ color: '#dc931dff' }}>🏆Top Companies</span>
        </div>
        <div className="feature-item">
          <span style={{ color: '#dc931dff'}}>⭐Top Talents</span>
        </div>
      </div>
    </div>
  </div>
);

export default BestSection;

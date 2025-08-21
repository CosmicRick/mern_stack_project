import React from 'react';
import './bestwork.css';

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
      <h1>We’re Only Working <br />With The Best</h1>
      <p>
        Ultricies purus dolor viverra mi laoreet at cursus justo. 
        Ultrices purus diam egestas amet faucibus tempor blandit.
      </p>
      <div className="features">
        <div className="feature-item">
          <span className="icon">🏅</span>
          <span>Quality Job</span>
        </div>
        <div className="feature-item">
          <span className="icon">📄</span>
          <span>Resume builder</span>
        </div>
        <div className="feature-item">
          <span className="icon">🏆</span>
          <span>Top Companies</span>
        </div>
        <div className="feature-item">
          <span className="icon">⭐</span>
          <span>Top Talents</span>
        </div>
      </div>
    </div>
  </div>
);

export default BestSection;

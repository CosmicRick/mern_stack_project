import React, { useState, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer/footer";
import about from '../components/assets/about.jpg';
import './About.css';
import image1 from '../components/assets/4143944.jpg';
import HowItWorks from "../components/howitsworks";
import Bestwork from '../components/bestwork.jsx';
const About = () => {
  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme ?
    current_theme : 'light');
  useEffect(() => {
    localStorage.setItem('current_theme', theme)
  }, [theme])
  return (
    <div className={`nav-container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="p-6" style={{ textAlign: 'center' }}>
        <div className="imagecontentarss">
          <img src={about} alt="Albout Us" />
          <h1 style={{ margin: '0.12rem' }}> About Us</h1>
        </div>
        <div className="about-content" theme={theme} setTheme={setTheme}>
          <div className="left-side" theme={theme} setTheme={setTheme}>
            <p>
              SmartHire Nexus is a cutting-edge job portal designed to connect job seekers with employers in a seamless and efficient manner. Our platform leverages advanced technology to streamline the hiring process, making it easier for candidates to find their dream jobs and for companies to discover top talent.
            </p>
          </div>
          <div className="right-side" theme={theme} setTheme={setTheme}>
            <p>
              We are committed to providing a user-friendly experience, ensuring that both job seekers and employers can navigate our site with ease. Our mission is to revolutionize the job market by offering innovative solutions that enhance the recruitment process.
            </p>
          </div>
        </div>
        <div className="nextimage">
          <img src={image1} alt="About Us" className="about-image" />
        </div>
        <div className="how-it-works-section">
          <HowItWorks />
        </div>
        <div className="bestwork-section">
          <Bestwork />
        </div>
      </main>
      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default About;

import react, { useState, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer/footer";
import JobSearchBar from "../components/searchbar.jsx";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import './Home.css';
import home from '../components/assets/homeimag1.jpg';
import { Size } from "framer/render/types/Size.js";
import searchbar from "../components/searchbar.jsx";
import barofcontext from '../components/assets/barofcontext.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobCard from "../components/card.jsx";

const Home = () => {
  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme ?
    current_theme : 'light');
  useEffect(() => {
    localStorage.setItem('current_theme', theme)
  }, [theme])
  const [text] = useTypewriter({
    words: ['-Hire the best talent', '-Find your dream job', '-Build your career'],
    loop: {},
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });
  return (
    <>
      <div className={`nav-container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <main>
          <div className="imagecontent">
            <img src={home} alt="Home" className="home-image" />
            <h1 style={{ margin: '-4.12rem' }}>
              Welcome to SmartHire Nexus
            </h1>
            <br></br>
            <span style={{ fontWeight: 'bold', fontSize: '44px' }}>
              {text}
            </span>
            <span style={{ color: 'red', fontSize: '44px' }}><Cursor cursorStyle='|' /></span>
          </div>
          <JobSearchBar theme={theme} setTheme={setTheme} />
        </main>
        <div className="barofcontext">
          <img src={barofcontext} alt="Context Bar" className="context-bar" />
        </div>
        <div className="element_contanier">
        <div className="card-container">
          <JobCard theme={theme} setTheme={setTheme} />
        </div>
        </div>
        <Footer theme={theme} setTheme={setTheme} />
      </div>
    </>
  );
};

export default Home;

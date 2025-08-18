import react, { useState, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer/footer";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import './Home.css';
import home from '../components/assets/homeimag1.jpg';
import { Size } from "framer/render/types/Size.js";
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
      </main>
      <Footer theme={theme} setTheme={setTheme} />
    </div>
    </>
  );
};

export default Home;

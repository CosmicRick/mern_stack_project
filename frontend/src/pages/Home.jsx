import react, { useState, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer/footer";
import JobSearchBar from "../components/searchbar.jsx";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import './Home.css';
import home from '../components/assets/homeimag1.jpg';
// import { Size } from "framer/render/types/Size.js";
import searchbar from "../components/searchbar.jsx";
import barofcontext from '../components/assets/barofcontext.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobCard from "../components/card.jsx";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
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
  useEffect(() => {
    axios.get('http://localhost:8000')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);
const data=  [
  {
    "title": "Software Engineer",
    "company": "TechNova Solutions",
    "location": "Bangalore, India",
    "type": "full-time",
    "salaryMin": 600000,
    "salaryMax": 1200000,
    "image": "https://example.com/images/software-engineer.png",
    "description": "Develop and maintain scalable web applications using MERN stack.",
    "requirements": ["JavaScript", "React", "Node.js", "MongoDB"],
    "createdBy": "64c9a1e5f1b2a7c1e1234567"
  },
]

  return (
    <div className={`nav-contente ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <div className="imagecontent">
          <img src={home} alt="Home" className="home-image" />
          <h1 style={{ margin: '-4.12rem' }}>
            Welcome to SmartHire Nexus
          </h1>
          <span style={{ fontWeight: 'bold', fontSize: '44px', left: '73rem' }}>
            {text}
          </span>
          <span style={{ color: 'red', fontSize: '44px', top: '0rem' }}><Cursor cursorStyle='|' />
          </span>
        </div>
        <div className="search">
          <JobSearchBar theme={theme} setTheme={setTheme} className="job-search-bar" />
        </div>
        <div className="barofcontext">
          <img src={barofcontext} alt="Context Bar" className="context-bar" />
          <div className="card-demandedjob">
            <div className="card-demandedjobfirstrow">
              <JobCard theme={theme} setTheme={setTheme} />
            {data.map((job, index) => (
              <JobCard key={index} job={job} theme={theme} setTheme={setTheme} details={job} />
            ))}
            </div>
            <div className="nextpagebuttion">
                  <Button as="input" type="submit" value="NextPage" theme={theme} setTheme={setTheme} />
            </div>
          </div>
        </div>
        <Footer theme={theme} setTheme={setTheme} />
      </main>
    </div>
  );
};

export default Home;
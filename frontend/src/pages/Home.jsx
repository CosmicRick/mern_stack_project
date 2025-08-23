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
  {
    "title": "Data Analyst",
    "company": "Insight Analytics",
    "location": "Pune, India",
    "type": "full-time",
    "salaryMin": 400000,
    "salaryMax": 900000,
    "image": "https://example.com/images/data-analyst.png",
    "description": "Analyze datasets and generate business insights with visualization tools.",
    "requirements": ["Python", "SQL", "Tableau", "Excel"],
    "createdBy": "64c9a1e5f1b2a7c1e1234568"
  },
  {
    "title": "UI/UX Designer",
    "company": "Designify Studio",
    "location": "Remote",
    "type": "contract",
    "salaryMin": 300000,
    "salaryMax": 700000,
    "image": "https://example.com/images/ui-ux.png",
    "description": "Design user-friendly interfaces and create wireframes for web/mobile apps.",
    "requirements": ["Figma", "Adobe XD", "User Research", "Wireframing"],
    "createdBy": "64c9a1e5f1b2a7c1e1234569"
  },
  {
    "title": "Frontend Developer",
    "company": "NextGen Tech",
    "location": "Hyderabad, India",
    "type": "full-time",
    "salaryMin": 500000,
    "salaryMax": 1100000,
    "image": "https://example.com/images/frontend.png",
    "description": "Implement responsive UI with modern JavaScript frameworks.",
    "requirements": ["React", "JavaScript", "CSS", "HTML"],
    "createdBy": "64c9a1e5f1b2a7c1e1234570"
  },
  {
    "title": "Backend Developer",
    "company": "CloudStack Systems",
    "location": "Chennai, India",
    "type": "full-time",
    "salaryMin": 550000,
    "salaryMax": 1150000,
    "image": "https://example.com/images/backend.png",
    "description": "Build robust APIs and manage database integrations.",
    "requirements": ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    "createdBy": "64c9a1e5f1b2a7c1e1234571"
  },
  {
    "title": "Digital Marketing Specialist",
    "company": "GrowthHub Media",
    "location": "Mumbai, India",
    "type": "part-time",
    "salaryMin": 250000,
    "salaryMax": 600000,
    "image": "https://example.com/images/marketing.png",
    "description": "Plan and execute digital marketing campaigns across multiple channels.",
    "requirements": ["SEO", "Google Ads", "Social Media", "Content Marketing"],
    "createdBy": "64c9a1e5f1b2a7c1e1234572"
  },
  {
    "title": "Machine Learning Engineer",
    "company": "AIWorks Labs",
    "location": "Delhi, India",
    "type": "full-time",
    "salaryMin": 800000,
    "salaryMax": 1600000,
    "image": "https://example.com/images/ml.png",
    "description": "Develop machine learning models for predictive analytics.",
    "requirements": ["Python", "TensorFlow", "Scikit-learn", "Data Science"],
    "createdBy": "64c9a1e5f1b2a7c1e1234573"
  },
  {
    "title": "Intern - Web Development",
    "company": "StartupX",
    "location": "Remote",
    "type": "internship",
    "salaryMin": 10000,
    "salaryMax": 20000,
    "image": "https://example.com/images/internship.png",
    "description": "Assist in building and testing web applications under mentor guidance.",
    "requirements": ["HTML", "CSS", "JavaScript", "React"],
    "createdBy": "64c9a1e5f1b2a7c1e1234574"
  },
  {
    "title": "Project Manager",
    "company": "Enterprise Solutions",
    "location": "Kolkata, India",
    "type": "full-time",
    "salaryMin": 900000,
    "salaryMax": 1800000,
    "image": "https://example.com/images/pm.png",
    "description": "Manage IT projects ensuring timely delivery and resource allocation.",
    "requirements": ["Agile", "Scrum", "Leadership", "Communication"],
    "createdBy": "64c9a1e5f1b2a7c1e1234575"
  },
  {
    "title": "Cybersecurity Analyst",
    "company": "SecureNet Pvt Ltd",
    "location": "Gurgaon, India",
    "type": "full-time",
    "salaryMin": 700000,
    "salaryMax": 1400000,
    "image": "https://example.com/images/cybersecurity.png",
    "description": "Monitor and protect systems from cyber threats and vulnerabilities.",
    "requirements": ["Networking", "Firewalls", "Penetration Testing", "Linux"],
    "createdBy": "64c9a1e5f1b2a7c1e1234576"
  }
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
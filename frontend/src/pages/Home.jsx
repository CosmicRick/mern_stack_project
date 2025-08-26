import React, { useState, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer/footer";
import JobSearchBar from "../components/searchbar.jsx";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import "./Home.css";
import home from "../components/assets/homeimag1.jpg";
import barofcontext from "../components/assets/barofcontext.png";
import "bootstrap/dist/css/bootstrap.min.css";
import JobCard from "../components/card.jsx";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { getAllJobs } from "../services/job.api"; 

const Home = () => {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  const [text] = useTypewriter({
    words: [
      "-Hire the best talent",
      "-Find your dream job",
      "-Build your career",
    ],
    loop: {},
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

// Fetch Jobs from API
useEffect(() => {
  setLoading(true);
  getAllJobs({})
    .then((response) => {
      setJobs(response.data.jobs || []);
      setLoading(false);
    })
    .catch((error) => {
      setError("Failed to load jobs. Please try again later.");
      setLoading(false);
      console.error("Error fetching jobs:", error);
    });
}, []);

  return (
    <div className={`nav-contente ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <div className="imagecontent">
          <img src={home} alt="Home" className="home-image" />
          <h1 style={{ margin: "-4.12rem" }}>Welcome to SmartHire Nexus</h1>
          <span
            style={{ fontWeight: "bold", fontSize: "44px", left: "73rem" }}
          >
            {text}
          </span>
          <span style={{ color: "red", fontSize: "44px", top: "0rem" }}>
            <Cursor cursorStyle="|" />
          </span>
        </div>
        <div className="search">
          <JobSearchBar
            theme={theme}
            setTheme={setTheme}
            className="job-search-bar"
          />
        </div>
        <div className="barofcontext">
          <img src={barofcontext} alt="Context Bar" className="context-bar" />
          <div className="card-demandedjob">
            <div className="card-demandedjobfirstrow">
              {loading ? (
                <p>Loading jobs...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : jobs.length === 0 ? (
                <p>No jobs found.</p>
              ) : (
                jobs.map((job, index) => (
                  <JobCard
                    key={index}
                    job={job}
                    theme={theme}
                    setTheme={setTheme}
                    details={job}
                  />
                ))
              )}
            </div>
            <div className="nextpagebuttion">
              <Button
                as="input"
                type="submit"
                value="NextPage"
                theme={theme}
                setTheme={setTheme}
              />
            </div>
          </div>
        </div>
        <Footer theme={theme} setTheme={setTheme} />
      </main> 
    </div>
  );
};

export default Home;

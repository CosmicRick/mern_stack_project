import React, { useState, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer/footer";
import JobSearchBar from "../components/searchbar.jsx";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import "./Home.css";
import home from "../components/assets/homeimag1.jpg";
import SpotifyLogo from "../components/assets/spotify.png";
import AmazoneLogo from "../components/assets/amazon.png";
import TcsLogo from "../components/assets/tcs.png";
import FacebookLogo from "../components/assets/facebook.png";
import wiproLogo from "../components/assets/wipro.png";
import deloitteLogo from "../components/assets/deloitte.png";
import AirbnbLogo from "../components/assets/airbnb.png";
import "bootstrap/dist/css/bootstrap.min.css";
import JobCard from "../components/card.jsx";
import Button from "react-bootstrap/Button";
import { getJobs } from "../services/api";
import sidebar from "../components/sidebar.jsx";
import Sidebar from "../components/sidebar.jsx";


const Home = () => {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // filters
  const [filters, setFilters] = useState({});

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  const [text] = useTypewriter({
    words: ["-Hire the best talent", "-Find your dream job", "-Build your career"],
    loop: {},
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });
  // Fetch jobs whenever filters or page changes
  useEffect(() => {
    setLoading(true);
    getJobs({ ...filters, page, limit })
      .then((response) => {
        setJobs(response.data.jobs || []);
        setTotalPages(response.data.totalPages || 1);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load jobs. Please try again later.");
        setLoading(false);
        console.error("Error fetching jobs:", error);
      });
  }, [filters, page, limit]);

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
    setPage(1); // reset to first page on new search
  };

  return (
    <>
      <div className={`nav-contente ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <main>
          <div className="imagecontent">
            <img src={home} alt="Home" className="home-image" />
            <h1 style={{ margin: "-4.12rem" }}>Welcome to SmartHire Nexus</h1>
            <span style={{ fontWeight: "bold", fontSize: "44px", left: "73rem" }}>
              {text}
            </span>
            <span style={{ color: "red", fontSize: "44px", top: "0rem" }}>
              <Cursor cursorStyle="|" />
            </span>
          </div>

          {/* Search Bar */}
          <div className="search">
            <JobSearchBar onSearch={handleSearch} />
          </div>

          {/* Jobs Section */}
          <div className="barofcontext">
            <div className="marqueebar">
              <marquee behavior="alternate" direction="Left" scrollamount="13" >
                <img src={SpotifyLogo} alt="Spotify" className="logo-m" />
                <img src={AmazoneLogo} alt="Amazon" className="logo-m" />
                <img src={TcsLogo} alt="TCS" className="logo-m" />
                <img src={FacebookLogo} alt="Facebook" className="logo-m" />
                <img src={wiproLogo} alt="Wipro" className="logo-m" />
                <img src={deloitteLogo} alt="Deloitte" className="logo-w" />
                <img src={AirbnbLogo} alt="Airbnb" className="logo-w" />
              </marquee>
            </div>
            <div className="contents">
              <div className="sidebar" style={{ width: '20rem' }}>
                <Sidebar></Sidebar>
              </div>
              <div className="card-demandedjob">
                {loading ? (
                  <p>Loading jobs...</p>
                ) : error ? (
                  <p style={{ color: "red" }}>{error}</p>
                ) : jobs.length === 0 ? (
                  <p>No jobs found.</p>
                ) : (
                  <>
                    {jobs.slice(0, 10).map((job, index) => (
                      <JobCard
                        key={index}
                        job={job}
                        theme={theme}
                        setTheme={setTheme}
                        details={job}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
        <div className="footer">
          <Footer theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </>
  );
};

export default Home;

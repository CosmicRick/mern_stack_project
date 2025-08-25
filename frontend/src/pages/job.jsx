import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navigation/Navbar";
import "./Jobs.css";
import Jobimage from '../components/assets/jobimage.jpg';
import Footer from "../components/Footer/footer";
const mockJobs = [
  {
    _id: '1',
    title: 'Senior Software Engineer',
    company: 'TCS',
    city: 'Kolkata',
    description: 'We are looking for a passionate Senior Software Engineer to join our team. You will be responsible for designing and implementing scalable software solutions using modern technologies.',
    requirements: 'Bachelor\'s degree in Computer Science, 5+ years experience with React, Node.js, and cloud platforms.',
    salary: '₹12,00,000 - ₹18,00,000',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Product Manager',
    company: 'Wipro',
    city: 'Kolkata',
    description: 'Lead product development initiatives and work closely with engineering teams to deliver innovative products to market. Drive product strategy and roadmap.',
    requirements: 'MBA preferred, 3+ years product management experience, strong analytical skills.',
    salary: '₹10,00,000 - ₹15,00,000',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: '3',
    title: 'UX Designer',
    company: 'Infosys',
    city: 'Kolkata',
    description: 'Create intuitive and beautiful user experiences for our next generation of products. Work with cross-functional teams to bring designs to life.',
    requirements: 'Bachelor\'s in Design or related field, proficiency in Figma/Sketch, portfolio required.',
    salary: '₹8,00,000 - ₹12,00,000',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    _id: '4',
    title: 'DevOps Engineer',
    company: 'Cognizant',
    city: 'Kolkata',
    description: 'Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability and scalability.',
    requirements: 'Experience with AWS, Docker, Kubernetes, Terraform. Strong scripting skills.',
    salary: '₹9,00,000 - ₹14,00,000',
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
];

const Jobs = () => {
  // Theme state management - moved from About component to Jobs
  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme)
  }, [theme])

  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const currentSortBy = params.get("sortBy") || "createdAt";
    const currentSortOrder = params.get("sortOrder") || "desc";

    setSortBy(currentSortBy);
    setSortOrder(currentSortOrder);
    setLoading(true);

    // Simulate API call with mock data from admin structure
    setTimeout(() => {
      let filteredJobs = [...mockJobs];

      // Filter by search term
      if (search) {
        filteredJobs = filteredJobs.filter(job =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase()) ||
          job.city.toLowerCase().includes(search.toLowerCase()) ||
          job.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Sort jobs
      filteredJobs.sort((a, b) => {
        let aValue = a[currentSortBy];
        let bValue = b[currentSortBy];

        if (currentSortBy === 'createdAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (currentSortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      setJobs(filteredJobs);
      setLoading(false);
    }, 1000);
  }, [location.search]);

  const handleSortChange = (field) => {
    navigate(`?sortBy=${field}&sortOrder=${sortOrder}`);
  };

  const toggleOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    navigate(`?sortBy=${sortBy}&sortOrder=${newOrder}`);
  };

  // Get days since job was posted
  const getDaysSincePosted = (dateString) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <div className={`nav ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <div className="imagecontent">
          <img src={Jobimage} alt="Jobs" />
        </div>
        <div className="min-h-screen bg-transparent backdrop-blur-md" style={{ paddingTop: '1rem' }}>
          <div className="max-w-7xl mx-auto p-5">
            <div className="bg-gradient-to-r from-green-800 to-green-600 text-white p-8 rounded-2xl mb-8 shadow-lg">
              <h1 className="text-4xl font-bold mb-3">Job Listings</h1>
              <p className="text-xl opacity-90">Discover your next career opportunity</p>
            </div>
            {/* Sorting Controls */}
            <div className="glass-panel p-8 rounded-xl shadow-md mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-green-800">Job Search</h2>
              </div>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex flex-col flex-1 min-w-[200px]">
                  <label className="text-green-800 font-semibold mb-2 text-sm">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300"
                  >
                    <option value="createdAt">Date Posted</option>
                    <option value="title">Job Title</option>
                    <option value="company">Company</option>
                    <option value="city">Location</option>
                  </select>
                </div>
                <div className="flex flex-col flex-1 min-w-[200px]">
                  <label className="text-green-800 font-semibold mb-2 text-sm">Order</label>
                  <button
                    onClick={toggleOrder}
                    className="px-4 py-3 border-2 border-green-200 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none transition-all duration-300"
                  >
                    {sortOrder === "asc" ? "⬆ Ascending" : "⬇ Descending"}
                  </button>
                </div>
              </div>
            </div>

            {/* Alert for no jobs */}
            {!loading && jobs.length === 0 && (
              <div className="p-4 rounded-lg mb-6 font-medium bg-blue-100 text-blue-800 border border-blue-200">
                No jobs found matching your criteria. Try adjusting your search.
              </div>
            )}

            {/* Loading State - updated to glass panel */}
            {loading ? (
              <div className="text-center py-12 glass-panel rounded-xl shadow-md">
                <div className="text-green-600 text-xl">Loading jobs...</div>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map(job => (
                  <div key={job._id} className="glass-card border-2 border-green-200 rounded-xl p-6 hover:border-green-600 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-green-800 mb-1">{job.title}</div>
                        <div className="text-xl text-green-600 font-semibold mb-1">{job.company}</div>
                        <div className="text-gray-600 mb-3">{job.city}</div>
                        <div className="text-gray-700 leading-relaxed mb-4">
                          {job.description && job.description.length > 200
                            ? `${job.description.substring(0, 200)}...`
                            : job.description || 'No description available'}
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                          <span className="font-medium">Salary: {job.salary || 'Not specified'}</span>
                          <span className="font-medium">
                            Posted: {getDaysSincePosted(job.createdAt)} days ago
                          </span>
                        </div>
                      </div>
                      <div>
                        <button className="bg-gradient-to-r from-green-600 to-green-800 text-black px-4 py-2 rounded-lg font-semibold hover:from-green-800 hover:to-green-900 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-md">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;

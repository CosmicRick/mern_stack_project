import React, { useEffect, useState } from "react";
import Navbar from "../components/navigation/Navbar";
import "./Jobs.css";
import Jobimage from "../components/assets/jobimage.jpg";
import Footer from "../components/Footer/footer";
import { getJobs, getUniqueCities, getUniqueCompanies } from "../services/api";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  // Job states
  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [cities, setCities] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Fetch jobs
  const fetchJobs = () => {
    setLoading(true);
    getJobs({ search, sortBy, sortOrder, page, limit: 5, city, company })
      .then((response) => {
        setJobs(response.data.jobs || []);
        setTotalPages(response.data.totalPages || 1);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch jobs. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, [search, sortBy, sortOrder, page, city, company]);

  // Fetch filters (unique cities & companies)
  useEffect(() => {
    getUniqueCities().then((res) => setCities(res.data || []));
    getUniqueCompanies().then((res) => setCompanies(res.data || []));
  }, []);

  const toggleOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setPage(1);
  };

  const getDaysSincePosted = (dateString) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - posted);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
    const navigate = useNavigate();

    const viewJobDetails = (jobId) => {
      navigate(`/job/${jobId}`);
    };
  

  return (
     < >
      <div className={`nav ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <div className="imagecontent">
          <img src={Jobimage} alt="Jobs" />
        </div>

        <div className="min-h-screen bg-transparent backdrop-blur-md" style={{ paddingTop: "1rem" }}>
          <div className="max-w-7xl mx-auto p-5">
            <div className="bg-gradient-to-r from-green-800 to-green-600 text-white p-8 rounded-2xl mb-8 shadow-lg">
              <h1 className="text-4xl font-bold mb-3">Job Listings</h1>
              <p className="text-xl opacity-90">Discover your next career opportunity</p>
            </div>

            {/* Search + Filters + Sort */}
            <div className="glass-panel p-8 rounded-xl shadow-md mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">Job Search</h2>

              <div className="flex flex-wrap gap-4 mb-6">
                {/* Search */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search job title, company, city..."
                  className="flex-1 px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none min-w-[200px]"
                />

                {/* City Filter */}
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setPage(1);
                  }}
                  className="px-4 py-3 border-2 border-green-200 rounded-lg min-w-[200px]"
                >
                  <option value="">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {/* Company Filter */}
                <select
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    setPage(1);
                  }}
                  className="px-4 py-3 border-2 border-green-200 rounded-lg min-w-[200px]"
                >
                  <option value="">All Companies</option>
                  {companies.map((comp) => (
                    <option key={comp} value={comp}>
                      {comp}
                    </option>
                  ))}
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="px-4 py-3 border-2 border-green-200 rounded-lg min-w-[200px]"
                >
                  <option value="createdAt">Date Posted</option>
                  <option value="title">Job Title</option>
                  <option value="company">Company</option>
                </select>

                {/* Order */}
                <button
                  onClick={toggleOrder}
                  className="px-4 py-3 border-2 border-green-200 rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                  {sortOrder === "asc" ? "⬆ Asc" : "⬇ Desc"}
                </button>
              </div>
            </div>

            {/* Error / Empty / Loading */}
            {error && (
              <div className="p-4 rounded-lg mb-6 font-medium bg-red-100 text-red-800 border border-red-200">
                {error}
              </div>
            )}
            {!loading && jobs.length === 0 && (
              <div className="p-4 rounded-lg mb-6 font-medium bg-blue-100 text-blue-800 border border-blue-200">
                No jobs found matching your criteria.
              </div>
            )}
            {loading ? (
              <div className="text-center py-12 glass-panel rounded-xl shadow-md">
                <div className="text-green-600 text-xl">Loading jobs...</div>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="glass-card border-2 border-green-200 rounded-xl p-6 hover:border-green-600 hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-green-800 mb-1">{job.title}</div>
                        <div className="text-xl text-green-600 font-semibold mb-1">{job.company}</div>
                        <div className="text-gray-600 mb-3">{job.city}</div>
                        <div className="text-gray-700 leading-relaxed mb-4">
                          {job.description && job.description.length > 200
                            ? `${job.description.substring(0, 200)}...`
                            : job.description || "No description available"}
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                          <span className="font-medium">Salary: {job.salaryMin} - {job.salaryMax}</span>
                          <span className="font-medium">
                            Posted: {getDaysSincePosted(job.createdAt)} days ago
                          </span>
                        </div>
                      </div>
                      <div>
                        <button onClick={() => viewJobDetails(job._id)} className="bg-gradient-to-r from-green-600 to-green-800 text-black px-4 py-2 rounded-lg font-semibold hover:from-green-800 hover:to-green-900 transition-all shadow-md">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 bg-gray-100 hover:bg-gray-200"
                >
                  ⬅ Prev
                </button>
                <span className="font-semibold text-green-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 bg-gray-100 hover:bg-gray-200"
                >
                  Next ➡
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default Jobs;

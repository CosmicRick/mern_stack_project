import { useState, useEffect, useCallback } from 'react';
import './admin.css'
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/Footer/footer';
const JobAdminPanel = () => {
  // State management
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [cities, setCities] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCompanies: 0,
    totalCities: 0,
    recentJobs: 0
  });

  // Filters and pagination
  const [filters, setFilters] = useState({
    search: '',
    company: '',
    city: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    city: '',
    salary: '',
    description: '',
    requirements: ''
  });

  // Alert state
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Mock user ID
  const CURRENT_USER_ID = '507f1f77bcf86cd799439011';

  // Show alert function
  const showAlert = (message, type = 'info') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  // Mock data for demonstration
  const mockJobs = [
    {
      _id: '1',
      title: 'Senior Software Engineer',
      company: 'TCS',
      city: 'Kolkata',
      description: 'We are looking for a passionate Senior Software Engineer to join our team. You will be responsible for designing and implementing scalable software solutions using modern technologies.',
      requirements: 'Bachelor\'s degree in Computer Science, 5+ years experience with React, Node.js, and cloud platforms.',
      salary: '₹12,00,000 - ₹18,00,000',
      createdAt: new Date().toISOString(),
      createdBy: CURRENT_USER_ID
    },
    {
      _id: '2',
      title: 'Product Manager',
      company: 'Wipro',
      city: 'Kolkata',
      description: 'Lead product development initiatives and work closely with engineering teams to deliver innovative products to market. Drive product strategy and roadmap.',
      requirements: 'MBA preferred, 3+ years product management experience, strong analytical skills.',
      salary: '₹10,00,000 - ₹15,00,000',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      createdBy: CURRENT_USER_ID
    },
    {
      _id: '3',
      title: 'UX Designer',
      company: 'Infosys',
      city: 'Kolkata',
      description: 'Create intuitive and beautiful user experiences for our next generation of products. Work with cross-functional teams to bring designs to life.',
      requirements: 'Bachelor\'s in Design or related field, proficiency in Figma/Sketch, portfolio required.',
      salary: '₹8,00,000 - ₹12,00,000',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      createdBy: CURRENT_USER_ID
    },
    {
      _id: '4',
      title: 'DevOps Engineer',
      company: 'Cognizant',
      city: 'Kolkata',
      description: 'Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability and scalability.',
      requirements: 'Experience with AWS, Docker, Kubernetes, Terraform. Strong scripting skills.',
      salary: '₹9,00,000 - ₹14,00,000',
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      createdBy: CURRENT_USER_ID
    },
  ];
  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme ?
    current_theme : 'light');
  useEffect(() => {
    localStorage.setItem('current_theme', theme)
  }, [theme])

  const mockCompanies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta'];
  const mockCities = ['kolkata', 'Bangalore', 'Mumbai', 'delhi', 'bangalore'];

  // Load data functions
  const loadStats = useCallback(async () => {
    try {
      // In a real app, this would be an API call
      const filteredJobs = mockJobs.filter(job =>
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase())
      );

      setStats({
        totalJobs: filteredJobs.length,
        totalCompanies: mockCompanies.length,
        totalCities: mockCities.length,
        recentJobs: Math.min(filteredJobs.length, 12)
      });
    } catch (error) {
      showAlert('Error loading stats: ' + error.message, 'error');
    }
  }, [filters.search]);

  const loadCompanies = useCallback(async () => {
    try {
      // In a real app: const response = await fetch(`${API_BASE}/jobs/companies`);
      setCompanies(mockCompanies);
    } catch (error) {
      showAlert('Error loading companies: ' + error.message, 'error');
      setCompanies(mockCompanies);
    }
  }, []);

  const loadCities = useCallback(async () => {
    try {
      // In a real app: const response = await fetch(`${API_BASE}/jobs/cities`);
      setCities(mockCities);
    } catch (error) {
      showAlert('Error loading cities: ' + error.message, 'error');
      setCities(mockCities);
    }
  }, []);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call with filtering and pagination
      let filteredJobs = [...mockJobs];

      // Apply search filter
      if (filters.search) {
        filteredJobs = filteredJobs.filter(job =>
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      // Apply company filter
      if (filters.company) {
        filteredJobs = filteredJobs.filter(job =>
          job.company.toLowerCase().includes(filters.company.toLowerCase())
        );
      }

      // Apply city filter
      if (filters.city) {
        filteredJobs = filteredJobs.filter(job =>
          job.city.toLowerCase().includes(filters.city.toLowerCase())
        );
      }

      // Apply sorting
      filteredJobs.sort((a, b) => {
        const aValue = a[filters.sortBy] || '';
        const bValue = b[filters.sortBy] || '';
        const comparison = aValue.localeCompare ? aValue.localeCompare(bValue) : aValue - bValue;
        return filters.sortOrder === 'asc' ? comparison : -comparison;
      });

      // Apply pagination
      const limit = 10;
      const startIndex = (currentPage - 1) * limit;
      const paginatedJobs = filteredJobs.slice(startIndex, startIndex + limit);
      const pages = Math.ceil(filteredJobs.length / limit);

      setJobs(paginatedJobs);
      setTotalPages(pages);

      setTimeout(() => setLoading(false), 500); // Simulate network delay

    } catch (error) {
      showAlert('Error loading jobs: ' + error.message, 'error');
      setLoading(false);
    }
  }, [filters, currentPage]);

  // CRUD operations
  const createJob = async (jobData) => {
    try {
      // In a real app: const response = await fetch(`${API_BASE}/jobs`, { method: 'POST', ... });
      const newJob = {
        ...jobData,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        createdBy: CURRENT_USER_ID
      };

      mockJobs.unshift(newJob);
      showAlert('Job created successfully!', 'success');
      loadJobs();
      loadStats();

    } catch (error) {
      showAlert('Error creating job: ' + error.message, 'error');
    }
  };

  const updateJob = async (jobId, jobData) => {
    try {
      // In a real app: const response = await fetch(`${API_BASE}/jobs/${jobId}`, { method: 'PUT', ... });
      const jobIndex = mockJobs.findIndex(job => job._id === jobId);
      if (jobIndex !== -1) {
        mockJobs[jobIndex] = { ...mockJobs[jobIndex], ...jobData };
      }

      showAlert('Job updated successfully!', 'success');
      loadJobs();

    } catch (error) {
      showAlert('Error updating job: ' + error.message, 'error');
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      // In a real app: await fetch(`${API_BASE}/jobs/${jobId}`, { method: 'DELETE' });
      const jobIndex = mockJobs.findIndex(job => job._id === jobId);
      if (jobIndex !== -1) {
        mockJobs.splice(jobIndex, 1);
      }

      showAlert('Job deleted successfully!', 'success');
      loadJobs();
      loadStats();

    } catch (error) {
      showAlert('Error deleting job: ' + error.message, 'error');
    }
  };

  // Modal functions
  const openJobModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title || '',
        company: job.company || '',
        city: job.city || '',
        salary: job.salary || '',
        description: job.description || '',
        requirements: job.requirements || ''
      });
    } else {
      setEditingJob(null);
      setFormData({
        title: '',
        company: '',
        city: '',
        salary: '',
        description: '',
        requirements: ''
      });
    }
    setModalOpen(true);
  };

  const closeJobModal = () => {
    setModalOpen(false);
    setEditingJob(null);
    setFormData({
      title: '',
      company: '',
      city: '',
      salary: '',
      description: '',
      requirements: ''
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (editingJob) {
      await updateJob(editingJob._id, formData);
    } else {
      await createJob(formData);
    }

    closeJobModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      company: '',
      city: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setCurrentPage(1);
  };

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Initialize data
  useEffect(() => {
    loadStats();
    loadCompanies();
    loadCities();
  }, [loadStats, loadCompanies, loadCities]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Render pagination
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Previous button
    pages.push(
      <button
        key="prev"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className="px-4 py-2 border-2 border-green-200 bg-white text-black rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 hover:text-black hover:border-green-600"
      >
        Previous
      </button>
    );

    // Page numbers
    if (startPage > 1) {
      pages.push(
        <button key="1" onClick={() => changePage(1)} className="px-4 py-2 border-2 border-green-200 bg-white text-black rounded-lg font-semibold transition-all duration-300 hover:bg-green-600 hover:text-black hover:border-green-600">
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={`px-4 py-2 border-2 rounded-lg font-semibold transition-all duration-300 ${i === currentPage
            ? 'bg-green-600 text-black border-green-600'
            : 'border-green-200 bg-white text-black hover:bg-green-600 hover:text-black hover:border-green-600'
            }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="px-2">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => changePage(totalPages)} className="px-4 py-2 border-2 border-green-200 bg-white text-black rounded-lg font-semibold transition-all duration-300 hover:bg-green-600 hover:text-black hover:border-green-600">
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
        className="px-4 py-2 border-2 border-green-200 bg-white text-black rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 hover:text-black hover:border-green-600"
      >
        Next
      </button>
    );

    return (
      <div className="flex justify-center items-center gap-2 p-6 bg-gray-50">
        {pages}
      </div>
    );
  };

  return (
    <>
      {/* Add Navbar at the top of the page */}
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto p-5">
          {/* Your existing content remains here */}
          {/* Header */}
          <div className="bg-gradient-to-r from-green-800 to-green-600 text-white p-8 rounded-2xl mb-8 shadow-lg">
            <h1 className="text-4xl font-bold mb-3">Job Management Admin Panel</h1>
            <p className="text-xl opacity-90">Manage job postings, track applications, and monitor performance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600 hover:transform hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-3xl font-bold text-green-800 mb-2">{stats.totalJobs}</h3>
              <p className="text-gray-600">Total Jobs</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600 hover:transform hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-3xl font-bold text-green-800 mb-2">{stats.totalCompanies}</h3>
              <p className="text-gray-600">Unique Companies</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600 hover:transform hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-3xl font-bold text-green-800 mb-2">{stats.totalCities}</h3>
              <p className="text-gray-600">Unique Cities</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600 hover:transform hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-3xl font-bold text-green-800 mb-2">{stats.recentJobs}</h3>
              <p className="text-gray-600">Recent Jobs (7 days)</p>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white p-8 rounded-xl shadow-md mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-green-800">Job Management</h2>
              <button
                onClick={() => openJobModal()}
                className="bg-gradient-to-r from-green-600 to-green-800 text-black px-6 py-3 rounded-lg font-semibold hover:from-green-800 hover:to-green-900 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                + Add New Job
              </button>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="flex flex-col">
                <label className="text-green-800 font-semibold mb-2 text-sm">Search Jobs</label>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by title or description..."
                  className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-green-800 font-semibold mb-2 text-sm">Filter by Company</label>
                <select
                  name="company"
                  value={filters.company}
                  onChange={handleFilterChange}
                  className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300"
                >
                  <option value="">All Companies</option>
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-green-800 font-semibold mb-2 text-sm">Filter by City</label>
                <select
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-green-800 font-semibold mb-2 text-sm">Sort By</label>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300"
                >
                  <option value="createdAt">Date Created</option>
                  <option value="title">Job Title</option>
                  <option value="company">Company</option>
                  <option value="city">City</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-green-800 font-semibold mb-2 text-sm">Sort Order</label>
                <select
                  name="sortOrder"
                  value={filters.sortOrder}
                  onChange={handleFilterChange}
                  className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={loadJobs}
                className="bg-gradient-to-r from-green-600 to-green-800 text-black px-6 py-2 rounded-lg font-semibold hover:from-green-800 hover:to-green-900 transition-all duration-300"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="bg-gray-100 text-black px-6 py-2 rounded-lg font-semibold border-2 border-green-200 hover:bg-gray-200 hover:border-green-600 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Alert */}
          {alert.show && (
            <div className={`p-4 rounded-lg mb-6 font-medium ${alert.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
              alert.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                'bg-blue-100 text-blue-800 border border-blue-200'
              }`}>
              {alert.message}
            </div>
          )}

          {/* Jobs Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-green-200">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Job Listings</h2>
              <p className="text-gray-600">Manage and monitor all job postings</p>
            </div>

            <div className="p-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-green-600 text-xl">Loading jobs...</div>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  <div className="text-xl mb-2">No jobs found</div>
                  <p>Try adjusting your filters or add a new job.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {jobs.map(job => (
                    <div key={job._id} className="border-2 border-green-200 rounded-xl p-6 bg-gray-50 hover:border-green-600 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300">
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
                            <span className="font-medium">Posted: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => openJobModal(job)}
                            className="bg-gray-100 text-black px-4 py-2 rounded-lg font-semibold border-2 border-green-200 hover:bg-gray-200 hover:border-green-600 transition-all duration-300"
                          >
                            View
                          </button>
                          <button
                            onClick={() => openJobModal(job)}
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-md"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteJob(job._id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-black px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-md"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {renderPagination()}
          </div>
        </div>
      </div>

      {/* Job Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-800 to-green-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
                <button
                  onClick={closeJobModal}
                  className="text-black hover:opacity-70 transition-opacity duration-300 text-3xl font-bold"
                >
                  close
                </button>
              </div>
            </div>
            <form onSubmit={handleFormSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                  <label className="text-green-800 font-semibold mb-2">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-green-800 font-semibold mb-2">Company *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-green-800 font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-green-800 font-semibold mb-2">Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="flex flex-col">
                  <label className="text-green-800 font-semibold mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300 resize-vertical"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-green-800 font-semibold mb-2">Requirements</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows="3"
                    className="px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300 resize-vertical"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-green-200">
                <button
                  type="button"
                  onClick={closeJobModal}
                  className="bg-gray-100 text-black px-6 py-3 rounded-lg font-semibold border-2 border-green-200 hover:bg-gray-200 hover:border-green-600 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-green-800 text-black px-6 py-3 rounded-lg font-semibold hover:from-green-800 hover:to-green-900 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  {editingJob ? 'Update Job' : 'Create Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Footer at the bottom of the page */}
      {/* <Footer /> */}
    </>
  );
};

export default JobAdminPanel;
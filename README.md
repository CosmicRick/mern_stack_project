# 🚀 MERN Stack Job Portal

A full-stack, enterprise-grade job portal application built with the MERN stack (MongoDB, Express.js, React, Node.js). This comprehensive platform provides a complete solution for job posting, application management, user authentication, and company profiles with both a robust backend API and a modern React frontend.

---

## 📋 Table of Contents

- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [📁 Project Structure](#project-structure)
- [🚀 Getting Started](#getting-started)
- [🔗 API Documentation](#api-documentation)
- [💻 Frontend Features](#frontend-features)
- [🤝 Contributing](#contributing)
- [📄 License](#license)
- [👥 Authors](#authors)

---

## ✨ Features

### 🔐 User Management & Authentication

- **Secure Authentication:** JWT-based authentication with registration, login, and logout
- **Role-Based Access Control:** User and admin roles with appropriate permissions
- **Profile Management:** Complete user profiles with personal details, education, experience, and skills
- **Resume Upload & Analysis:** AI-powered resume parsing and analysis for personalized recommendations
- **Application Dashboard:** Track job applications with status updates (Applied, Interviewing, Offered, Rejected)

### 💼 Job Management System

- **Job Creation & Management:** Full CRUD operations for job postings with detailed attributes
- **Advanced Search & Filtering:** Search jobs by title, company, location, type, and tags
- **Smart Job Recommendations:** AI-powered job matching based on user profiles
- **Application Tracking:** Complete workflow for job applications with status management
- **Job Analytics:** Statistics and insights for job postings and applications

### 🏢 Company Management

- **Company Profiles:** Comprehensive company registration and profile management
- **Company Directory:** Browse and search companies by name, industry, and size
- **Employee Management:** Track company employees and job postings
- **Company Analytics:** Real-time statistics on job postings and applications

### 🤖 AI-Powered Features

- **Intelligent Job Search:** AI-enhanced job recommendations and contextual search
- **Resume Analysis:** Automated resume parsing for skill extraction and job matching
- **Company Discovery:** AI-powered company recommendations based on user preferences
- **Smart Application Matching:** Intelligent matching between candidates and job requirements

### 📊 Analytics & Reporting

- **Dashboard Analytics:** Real-time insights on applications, jobs, and user engagement
- **Performance Metrics:** Track platform usage, success rates, and user behavior
- **Admin Panel:** Comprehensive admin dashboard for platform management

---

## 🛠️ Tech Stack

### Backend Technologies

- **Runtime:** Node.js (v14+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) + bcrypt
- **Middleware:** CORS, cookie-parser, dotenv
- **AI Integration:** Axios for external AI APIs

### Frontend Technologies

- **Framework:** React 18+ with Hooks
- **Build Tool:** Vite (ultra-fast development)
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** Modern CSS3 with responsive design
- **Development:** Hot Module Replacement (HMR)

### Development Tools

- **Version Control:** Git & GitHub
- **Package Manager:** npm
- **Code Organization:** Modular architecture with clear separation of concerns
- **Environment:** Development and production configurations

---

## 📁 Project Structure

```
mern_stack_project/
│
├── 📂 backend/                     # Node.js + Express API
│   ├── 📂 models/                  # Database schemas
│   │   ├── user.model.js           # User schema with authentication
│   │   ├── job.model.js            # Job posting schema
│   │   ├── company.model.js        # Company profile schema
│   │   └── application.model.js    # Job application schema
│   │
│   ├── 📂 conroller/              # Business logic controllers
│   │   ├── user.controller.js      # User management & auth
│   │   ├── job.controller.js       # Job CRUD operations
│   │   ├── application.controller.js # Application workflow
│   │   └── company.controller.js   # Company management
│   │
│   ├── 📂 routes/                  # API route definitions
│   │   ├── user.rout.js           # User & auth routes
│   │   ├── job.rout.js            # Job management routes
│   │   ├── company.rout.js        # Company routes
│   │   └── application.rout.js    # Application routes
│   │
│   ├── 📂 middleware/              # Custom middleware
│   │   └── isAuthenticated.js      # JWT authentication middleware
│   │
│   ├── 📂 utils/                   # Utility functions
│   │   └── db.js                   # Database connection
│   │
│   ├── index.js                    # Server entry point
│   └── package.json                # Backend dependencies
│
├── 📂 frontend/                    # React.js Application
│   ├── 📂 public/                  # Static assets
│   │   └── favicon.svg             # App favicon
│   │
│   ├── 📂 src/                     # React source code
│   │   ├── 📂 components/          # Reusable UI components
│   │   │   ├── Header.jsx          # Navigation header
│   │   │   └── Footer.jsx          # App footer
│   │   │
│   │   ├── 📂 pages/               # Page components
│   │   │   └── Home.jsx            # Homepage component
│   │   │
│   │   ├── 📂 services/            # API integration
│   │   │   └── api.js              # HTTP client & API calls
│   │   │
│   │   ├── 📂 utils/               # Helper functions
│   │   │   └── helpers.js          # Utility functions
│   │   │
│   │   ├── 📂 hooks/               # Custom React hooks
│   │   ├── 📂 context/             # React context providers
│   │   │
│   │   ├── App.jsx                 # Main application component
│   │   ├── App.css                 # App-specific styles
│   │   ├── main.jsx                # React DOM entry point
│   │   └── index.css               # Global styles
│   │
│   ├── index.html                  # HTML template
│   ├── vite.config.js             # Vite configuration
│   ├── package.json               # Frontend dependencies
│   └── README.md                   # Frontend documentation
│
├── 📂 assets/                      # Project assets
│   └── 📂 logo/                    # Logo files
│
├── .env                           # Environment variables
└── README.md                      # Project documentation
```

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager
- **Git** for version control

### ⚡ Quick Setup

1. **📥 Clone the repository:**
   ```bash
   git clone https://github.com/CosmicRick/mern_stack_project.git
   cd mern_stack_project
   ```

### 🔧 Backend Setup

2. **📂 Navigate to backend directory:**

   ```bash
   cd backend
   ```

3. **📦 Install dependencies:**

   ```bash
   npm install
   ```

4. **⚙️ Configure environment variables:**

   Create a `.env` file in the `backend/` directory:

   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   NODE_ENV=development

   # Optional AI Integration
   AI_JOB_SEARCH_API=your_ai_api_endpoint
   AI_COMPANY_SEARCH_URL=your_ai_company_search_endpoint
   AI_API_KEY=your_ai_api_key
   ```

5. **🚀 Start the backend server:**
   ```bash
   npm start
   ```
   Backend will run on **http://localhost:8000**

### 🎨 Frontend Setup

6. **📂 Navigate to frontend directory:**

   ```bash
   cd ../frontend
   ```

7. **📦 Install frontend dependencies:**

   ```bash
   npm install
   ```

8. **🚀 Start the development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on **http://localhost:3000**

### 🎯 Quick Start Commands

```bash
# Start both servers concurrently (from project root)
npm run dev:all          # If you have concurrently setup

# Or start them separately:
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### User Endpoints

- `POST /api/users/register` — Register a new user
- `POST /api/users/login` — Authenticate and receive JWT token
- `POST /api/users/logout` — End user session
- `PUT /api/users/profile/:userId` — Update user profile
- `GET /api/users/profile/:userId` — Fetch user profile
- `POST /api/users/analyze-resume/:userId` — AI-based resume analysis (generates tags and role suggestions)

### Job Endpoints

- `POST /api/jobs/create` — Create a job posting (auth required)
- `GET /api/jobs/all` — Retrieve all jobs (with filtering)
- `GET /api/jobs/search` — Search jobs by title or tags
- `GET /api/jobs/:jobId` — Get job details
- `PUT /api/jobs/:jobId` — Update job posting (auth required)
- `DELETE /api/jobs/:jobId` — Delete job posting (auth required)
- `POST /api/jobs/smart-search` — AI-powered job recommendations/search

### Company Endpoints

- `POST /api/companies` — Register a new company
- `GET /api/companies` — List all companies (supports industry filter)
- `GET /api/companies/search` — Search companies by name
- `POST /api/companies/ai-search` — AI-powered company discovery

### Application Endpoints

- `POST /api/applications/apply/:jobId` — Apply to a job (auth required)
- `GET /api/applications/my-applications` — View user’s job applications
- `GET /api/applications/all` — (Admin) View all applications
- `PUT /api/applications/status/:applicationId` — (Admin) Update application status
- `POST /api/applications/ai-search` — AI-powered job matching

> For a complete overview of all API endpoints, consult the controller and model files in the `backend/` directory.

---

## Contributing

Contributions are highly encouraged! To get involved, please fork this repository and submit a pull request for review.

**Development workflow:**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 📜 What this means:

- ✅ **Commercial use** - Use this project for commercial purposes
- ✅ **Modification** - Modify and adapt the code
- ✅ **Distribution** - Distribute original or modified versions
- ✅ **Private use** - Use for personal/private projects
- ❗ **Attribution required** - Give credit to original authors

---

## 👥 Authors & Contributors

### 🏗️ Core Development Team

<table>
<tr>
<td align="center">
<a href="https://github.com/CosmicRick">
<img src="https://github.com/CosmicRick.png" width="100px;" alt="CosmicRick"/><br/>
<sub><b>CosmicRick</b></sub></a><br/>
<sub>Full-Stack Developer</sub>
</td>
<td align="center">
<a href="https://github.com/Sayandip6">
<img src="https://github.com/Sayandip6.png" width="100px;" alt="Sayandip Naskar"/><br/>
<sub><b>Sayandip Naskar</b></sub></a><br/>
<sub>Full-Stack Developer</sub>
</td>
</tr>
</table>

### 🤝 How to Become a Contributor

We welcome contributions! Check out our [Contributing Guidelines](#contributing) above to get started.

---

## 📞 Support & Contact

- **📧 Email:** [supradiproy737@gmail.com](mailto:supradiproy737@gmail.com)
- **🐛 Issues:** [GitHub Issues](https://github.com/CosmicRick/mern_stack_project/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/CosmicRick/mern_stack_project/discussions)
- **📱 Social:** Follow us for updates and announcements

---

## 🙏 Acknowledgments

- **React Team** for the amazing React library
- **MongoDB** for the robust database solution
- **Express.js** for the web framework
- **Vite** for the lightning-fast build tool
- **Open Source Community** for inspiration and tools

---

<div align="center">

### ⭐ Show Your Support

If this project helped you, please consider giving it a **⭐ star** on GitHub!

**Made with ❤️ by the MERN Stack Team**

[⬆ Back to Top](#-mern-stack-job-portal)

</div>

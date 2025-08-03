# JobPortal

A robust, enterprise-grade job portal backend engineered with Node.js, Express, and MongoDB. This repository offers a highly scalable, secure, and extensible API for comprehensive management of job postings, applications, user profiles, and company data—making it an ideal foundation for modern recruitment platforms, dynamic job search engines, or sophisticated internal hiring systems.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Highlights](#api-highlights)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

### User Management
- **Authentication & Authorization:** Secure user registration, login, logout, and JWT-based session management with role-based (user/admin) access control.
- **Profile Management:** Complete user profile management including contact details, social links (LinkedIn, GitHub, portfolio), education, experience, and skillsets.
- **Resume Handling & AI Analysis:** Upload and manage resumes, with integrated AI-powered analysis for generating personalized tags and career recommendations.
- **Application Dashboard:** View and manage job applications, including status tracking (Applied, Interviewing, Offered, Rejected).

### Job & Application Management
- **Job Posting & Management:** Create, update, delete, and manage job postings with detailed attributes (title, description, location, salary, type, experience level, tags, deadlines, and status).
- **Advanced Job Search:** Search and filter jobs by multiple criteria including title, tags, company, job type, and more.
- **Job Application Workflow:** Users can apply for jobs with resumes and cover letters; admins/HR can update and oversee application statuses.
- **Comprehensive Application Tracking:** Support for tracking all applications, both by individual users and via an administrative overview.

### Company Management
- **Company Profiles:** Register, update, and delete company profiles with details such as name, description, logo, website, industry, and employee directory.
- **Company Directory & Search:** Browse and search companies by name or industry, with support for advanced filtering.
- **Company Analytics:** Real-time statistics on jobs posted and employee metrics per company.

### Artificial Intelligence & Automation
- **AI-Powered Job Search:** Intelligent job recommendations and contextual search using external AI APIs.
- **AI Resume Analyzer:** Automated resume parsing to generate smart tags and suggest optimal roles to users.
- **AI Company Discovery:** Discover and recommend companies based on user intent or search keywords.

### Platform-Wide Enhancements
- **Data Analytics:** Track applicant counts, job statistics, company metrics, and platform-wide analytics.
- **RESTful API Design:** All functionalities are exposed via clean, well-documented REST endpoints.
- **Extensible Architecture:** Modular codebase with clear separation of concerns (models, controllers, routes, middleware, utilities), enabling easy maintenance and scalability.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT, bcrypt
- **Middleware/Utilities:** dotenv, cookie-parser, cors, axios (for AI integrations)

---

## Getting Started

### Prerequisites

- **Node.js** >= 14.x
- **MongoDB** (local or cloud instance)
- **npm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GOD-DEBANG/jobportal.git
   cd jobportal/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in `backend/` with the following settings:
   ```
   PORT=3000
   MONGO_URI=your_mongo_connection_string
   SECRET_KEY=your_jwt_secret
   NODE_ENV=development
   AI_JOB_SEARCH_API=your_ai_api_endpoint     # (optional: for AI job search)
   AI_COMPANY_SEARCH_URL=your_ai_company_search_endpoint # (optional: for AI company search)
   AI_API_KEY=your_ai_api_key                # (optional: for AI integrations)
   ```

4. **Launch the server:**
   ```bash
   npm start
   ```
   The backend service will be available at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
backend/
│
├── models/
│   ├── user.model.js
│   ├── job.model.js
│   ├── company.model.js
│   └── application.model.js
│
├── controller/
│   ├── user.controller.js
│   ├── job.controller.js
│   ├── application.controller.js
│   └── company.controller.js
│
├── routes/
│   ├── user.rout.js
│   ├── job.rout.js
│   ├── company.rout.js
│   └── application.rout.js
│
├── utils/
│   └── db.js
│
├── middleware/
│   └── (auth and other middlewares)
│
├── index.js
└── ...
```

---

## API Highlights

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

This project is currently **not licensed**. You are free to use or adapt the codebase as needed. For further information, please contact the repository owner.

---

## Author
 [GOD-DEBANG](https://github.com/GOD-DEBANG)
 [CosmicRick](https://github.com/CosmicRick)





<<<<<<< HEAD
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';




function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
             <Route path="/login" element={<Login />} />
          </Routes>
      </Router>
      <h1>Welcome to the App</h1>
    </div>
=======
import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <h1>Job Portal</h1>
            
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Login />} /> {/* Default page */}
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </header>
      </div>
    </Router>
>>>>>>> fe56032c462431074466306d5be91231c3805fc7
  )
}

export default App
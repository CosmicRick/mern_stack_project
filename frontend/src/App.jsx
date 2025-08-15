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
  )
}

export default App
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './pages/Home';

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
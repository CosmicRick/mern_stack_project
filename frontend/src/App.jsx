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
  )
}

export default App

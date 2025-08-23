import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/contactus'; // Fixed capitalization
import Admin from './pages/Admin';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <Admin />
          </AdminProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;


function AdminProtectedRoute({ children }) {
  let user = localStorage.getItem("user") 
  if (!user) return <Navigate to="/" />;
  user = JSON.parse(user);
  return user.role=='admin' ? children : <Navigate to="/" />;
}
import { useState } from 'react'
import './App.css'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'

function App() {
  const handleLogin = (data) => {
    console.log('User logged in with:', data);
    // Call backend API here
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Portal</h1>
        <Login onLogin={handleLogin} />
      </header>
    </div>
  );
}

export default App;
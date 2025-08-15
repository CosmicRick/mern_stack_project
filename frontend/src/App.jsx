import { useState } from 'react'
import './App.css'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Portal</h1>

        {/* Rendering components */}
        <Login />
        <Signup />

        <p>Welcome to the Job Portal Application</p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Job Portal logo to learn more
        </p>
      </header>
    </div>
  )
}

export default App

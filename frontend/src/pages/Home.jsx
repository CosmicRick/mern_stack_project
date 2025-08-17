import react, { useState, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
const App = () => {
  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme ?
    current_theme : 'light');
    useEffect (()=>{
      localStorage.setItem('current_theme', theme)
    },[theme])
  return (
    <div className={`nav-container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      
    </div>
  );
};

export default App;

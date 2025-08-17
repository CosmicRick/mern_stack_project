import react, { useState, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer/footer";
const Home = () => {
  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme ?
    current_theme : 'light');
  useEffect(() => {
    localStorage.setItem('current_theme', theme)
  }, [theme])
  return (
    <div className={`nav-container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />

      <main>
        <h1>Welcome to SmartHire Nexus</h1>
        <p>Your one-stop solution for all your hiring needs.</p>
      </main>
      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default Home;

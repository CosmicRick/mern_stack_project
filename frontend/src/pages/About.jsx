import React, { useState, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";

const About = () => {
  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme ?
    current_theme : 'light');
    useEffect (()=>{
      localStorage.setItem('current_theme', theme)
    },[theme])
  return (
    <div className={`nav-container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />

      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to our application! This project is built with React and
          designed to provide a smooth and modern experience. We focus on clean
          UI, simple navigation, and a theme toggle system so you can switch
          between light and dark mode.
        </p>
        <p className="text-lg leading-relaxed">
          Our goal is to create user-friendly apps that are easy to navigate,
          customizable, and built with the latest web technologies.
        </p>
      </main>
    </div>
  );
};

export default About;

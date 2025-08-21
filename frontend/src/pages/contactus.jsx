import { useState, useEffect } from 'react';
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/Footer/footer'
import './conactus.css';
import image1 from '../components/assets/contact.jpg';
import Contactelement from "../components/contactelement";
import Bar from '../components/assets/bar.png';
function Contactus() {
  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme ?
    current_theme : 'light');
  useEffect(() => {
    localStorage.setItem('current_theme', theme)
  }, [theme])
  return (
    <div className={`nav-bar ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="p-6" style={{ textAlign: 'center' }}>
        <div className='contactimage'>
          <img src={image1} alt="Contact Us" className="contact-image" />
        </div>
        <div className='content'>
          <Contactelement />
          <div className="contact-content" theme={theme} setTheme={setTheme}>
            <img src={Bar} alt="Bar" />
          </div>
        </div>
      </main>
      <Footer theme={theme} setTheme={setTheme} />
    </div>
  )
}
export default Contactus;

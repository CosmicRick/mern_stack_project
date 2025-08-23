import React from 'react'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/Footer/footer'
import hmage from '../components/assets/4565.jpg'
const Admin = () => {
  return (
    <div>
      <Navbar />
      <img src={hmage} alt="Admin" />
      <h1>Admin Dashboard</h1>
      
      <Footer />
    </div>
  )
}

export default Admin

import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import './contactelemnt.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-section">
      <div className="container">
        <div className="content-grid">
          {/* Left Side Content */}
          <div className="left-content">
            <h1 className="main-title">
              You Will Grow, You Will Succeed. We Promise That
            </h1>
            <p className="description">
              Pellentesque arcu facilisis nunc mi proin. Dignissim mattis in lectus tincidunt tincidunt
              ultrices. Diam convallis morbi pellentesque adipiscing
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <div className="icon-wrapper">
                  <Phone className="icon" />
                </div>
                <div className="contact-details">
                  <h3>Call for inquiry</h3>
                  <p>+257 388-6895</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon-wrapper">
                  <Mail className="icon" />
                </div>
                <div className="contact-details">
                  <h3>Send us email</h3>
                  <p>kramulous@sbcglobal.net</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon-wrapper">
                  <Clock className="icon" />
                </div>
                <div className="contact-details">
                  <h3>Opening hours</h3>
                  <p>Mon - Fri: 10AM - 10PM</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon-wrapper">
                  <MapPin className="icon" />
                </div>
                <div className="contact-details">
                  <h3>Office</h3>
                  <p>19 North Road Piscataway, NY 08854</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="right-content">
            <div className="form-container">
              <h2 className="form-title">Contact Info</h2>
              <p className="form-subtitle">Nibh dis faucibus proin lacus tristique</p>

              <div className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Your name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your E-mail address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                  ></textarea>
                </div>

                <button onClick={handleSubmit} className="submit-btn">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
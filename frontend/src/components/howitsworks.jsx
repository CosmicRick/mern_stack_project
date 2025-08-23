import React from 'react';
import { User, FileText, Briefcase, CheckCircle } from 'lucide-react';
import './howitworks.css';

const HowItWorks = () => {
  const steps = [
    {
      icon: <User className="w-12 h-12 text-teal-500" />,
      title: "Create Account",
      description: "Sign up with your email and create a professional profile to get started on your job search journey."
    },
    {
      icon: <FileText className="w-12 h-12 text-teal-500" />,
      title: "Upload Resume",
      description: "Upload your resume and let our AI-powered system match you with relevant job opportunities."
    },
    {
      icon: <Briefcase className="w-12 h-12 text-teal-500" />,
      title: "Find Jobs",
      description: "Browse thousands of job listings from top companies and filter by location, salary, and skills."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-teal-500" />,
      title: "Apply Job",
      description: "Apply to jobs with one click using your saved profile and track your application status in real-time."
    }
  ];

  return (
    <div className="how-it-works-section">
      <div className="container">
        <div className="header">
          <h2 className="title">How it works</h2>
          <p className="subtitle">
            Discover your dream job in just four simple steps. Our streamlined process makes job hunting
            efficient and stress-free, connecting you with the best opportunities in your field.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="icon-wrapper">
                {step.icon}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
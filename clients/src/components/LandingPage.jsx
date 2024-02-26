// LandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';
//import './App.css';




function LandingPage() {
 
  return (
    <div className="LandingPage">
      <header className="header">
        <div className="logo">BMS
        <img src="" alt="" />
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="container">
          <div>

          </div>
          <div className="content">
            <img src="" alt="Welcome Image" className="welcome-image" />
            <h1>Welcome to Bursary Management System 🎓</h1>
            <p>
              Empower yourself with our comprehensive Bursary Management System, designed to streamline the allocation and
               distribution of financial aid, ensuring efficiency and 
               transparency in every step of the process.🎓

                    <div>
                    <Link to="/signup" className="btn get-started">Get Started</Link>
                <p>
                  The Bursary Management System is a comprehensive platform designed to revolutionize the management of financial aid distribution within educational institutions. This innovative system streamlines the entire process, from application submission to fund allocation, ensuring efficiency and transparency at every step. With robust features such as online application submission, automated eligibility verification, and real-time tracking of disbursements, the system empowers administrators to efficiently manage bursary programs while providing students with a user-friendly interface to access and monitor their application status. By digitizing and automating traditional bursary processes, institutions can enhance accessibility, reduce administrative burdens, and promote fairness and equity in distributing financial assistance to deserving students.
                </p>
               
                </div>
            </p>
          </div>
          <div className="image-container">
            <img src="" />
          </div>
        </div>
       
      </main>
     
      <footer className="footer">
        <div className="footer-content">
          <p>Contact Us:</p>
          <ul>
            <li>Email: info@bursarymanagement.com</li>
            <li>Phone: +254726575709</li>
          </ul>
          
        </div>
        <div className="copyright">
          <p>&copy; 2024 Bursary Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

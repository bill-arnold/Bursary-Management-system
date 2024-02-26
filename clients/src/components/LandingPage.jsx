// LandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';
//import './App.css';




function LandingPage() {
 
  return (
    <div className="LandingPage">
      <header className="header">
        <div className="logo">BMS
        <img src="data:image/png;base64,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" alt="" />
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
          <div className="content">
            <h1>Welcome to Bursary Management System 🎓</h1>
            <p>
              Empower yourself with our comprehensive Bursary Management System, designed to streamline the allocation and
               distribution of financial aid, ensuring efficiency and 
               transparency in every step of the process.🎓

                    <div>
                    <Link to="/signup" className="btn get-started">Get Started</Link>
               
                </div>
            </p>
          </div>
          <div className="image-container">
            <img src="https://img.freepik.com/free-photo/front-view-stacked-books-graduation-cap-diploma-education-day_23-2149241011.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1708819200&semt=sph" alt="Bursary Management System" />
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

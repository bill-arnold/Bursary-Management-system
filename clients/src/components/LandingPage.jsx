import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//import image1 from "./images/bms 1.jpeg";
//import image2 from "./images/bms 2.jpeg";
//import image3 from "./images/bms 3.jpeg";
//import image4 from "./images/bms 4.jpeg";
//import image1 from "./images/image.png"
// import image2 from "./images/bms_2.jpeg"
// import image4 from "./images/bms_4.jpeg"
// import image3 from "./images/bms_3.jpeg"
import mainImage from './../assets/images/image.png';
import logo from './../assets/images/logo.png';
//import BackGround from './../assets/images/bms background.jpeg';


function LandingPage() {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 10000, // Adjust as needed
    autoplay: true,
    autoplaySpeed: 10000, // Change slides every 10 seconds
    slidesToShow: 1,
    slidesToScroll: 1
  };
 
  return (
  <div className="background-container">
    <div className="LandingPage" >
      <header className="header">
        <div className="logo">BMS
           <img src={logo} alt="Empowered Student" />
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
            <img src="/images/bms_2.jpeg" alt="Welcome Image" className="welcome-image" />
            <h1>Welcome to Bursary Management System 🎓</h1>
            <p>
              Empower yourself with our comprehensive Bursary Management System, designed to streamline the allocation and distribution of financial aid, ensuring efficiency and transparency in every step of the process.🎓
            </p>
            <div>
              <Link to="/signup" className="btn get-started">Get Started</Link>
              <p>
                The Bursary Management System is a comprehensive platform designed to revolutionize the management of financial aid distribution within educational institutions. This innovative system streamlines the entire process, from application submission to fund allocation, ensuring efficiency and transparency at every step. 
              </p>
            </div>
          </div>
         <div className="image-container">
           <img src={mainImage} alt="Empowered Student" />
 
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
    </div>
  );
}

export default LandingPage;



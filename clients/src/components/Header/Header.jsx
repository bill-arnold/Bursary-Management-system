// Header.js
import React from 'react';
import './header.css';

function Header() {
    return (
        <header className="header">
            <img src="./public/image/logo.png" alt="MINUZA Logo" className="logo"/>
            <nav>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#support">Support Center</a></li>
                    <li><a href="#login">Login</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

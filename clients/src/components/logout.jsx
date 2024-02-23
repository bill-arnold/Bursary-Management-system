// logout.jsx
import React from 'react';
import { logout } from './api';
import './AddBursary.css';

const Logout = () => {
  const handleLogout = async () => {
    // Call the logout function
    await logout();
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;

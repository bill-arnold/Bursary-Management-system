// RejectRequestComponent.jsx

import React, { useState, useEffect } from 'react';
import { rejectRequest, viewApplications } from './api';
import './RejectRequest.css'; // Import the stylesheet

const RejectRequestComponent = () => {
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [rejectedApplicant, setRejectedApplicant] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await viewApplications();
      console.log('Options:', response.data);
      setOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    try {
      if (!selectedApplicationId) {
        setMessage('Please select an application before rejecting the request.');
        return;
      }
      const response = await rejectRequest(selectedApplicationId);
      setMessage('Request rejected successfully!');
      console.log(response.data);
      // Find the rejected applicant based on the selectedApplicationId
      const rejectedApplicant = options.find(application => application.id === selectedApplicationId);
      setRejectedApplicant(rejectedApplicant);
    } catch (error) {
      setMessage('An error occurred while rejecting the request.');
      console.error(error);
    }
  };

  return (
    <div id="rejectRequestContainer">
      <select id="applicationSelector" onChange={(e) => setSelectedApplicationId(e.target.value)}>
        <option value="">Select an application</option>
        {options.map(application => (
          <option key={application.id} value={application.id}>{`${application.id} - ${application.contact_person}`}</option>
        ))}
      </select>
      <button id="rejectRequestButton" onClick={handleClick}>Reject Request</button>
      {message && <p id="rejectMessage">{message}</p>}
      {rejectedApplicant && (
        <div id="rejectedApplicantDetails">
          <p>ID: {rejectedApplicant.id}</p>
          <p>Name: {rejectedApplicant.name}</p>
          {/* Add more details if needed */}
        </div>
      )}
    </div>
  );
};

export default RejectRequestComponent;

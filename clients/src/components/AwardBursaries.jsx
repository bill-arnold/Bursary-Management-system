// AwardBursaries.jsx

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { awardBursaries, viewApplications } from './api';
import './AwardBursaries.css'; // Import the stylesheet

const AwardBursaries = () => {
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [awardedApplicant, setAwardedApplicant] = useState(null);

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
        setMessage('Please select an application before awarding the bursary.');
        return;
      }

      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to award the bursary. Continue?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, award it!',
        cancelButtonText: 'No, cancel',
      });

      if (!isConfirmed) {
        return;
      }

      const response = await awardBursaries(selectedApplicationId);
      setMessage('Bursary awarded successfully!');
      console.log(response.data);

      // Find the awarded applicant based on the selectedApplicationId
      const awardedApplicant = options.find(application => application.id === selectedApplicationId);
      setAwardedApplicant(awardedApplicant);

      Swal.fire('Success', 'Bursary awarded successfully!', 'success');
    } catch (error) {
      setMessage('An error occurred while awarding the bursary.');
      console.error(error);
      Swal.fire('Error', 'An error occurred while awarding the bursary.', 'error');
    }
  };

  return (
    <div id="awardBursariesContainer">
      <select id="applicationSelector" onChange={(e) => setSelectedApplicationId(e.target.value)}>
        <option value="">Select an application</option>
        {options.map(application => (
          <option key={application.id} value={application.id}>{`${application.id} - ${application.contact_person}`}</option>
        ))}
      </select>
      <button id="awardBursaryButton" onClick={handleClick}>Award Bursary</button>
      {message && <p id="awardMessage">{message}</p>}
      {awardedApplicant && (
        <div id="awardedApplicantDetails">
          <p>ID: {awardedApplicant.id}</p>
          <p>Name: {awardedApplicant.name}</p>
          {/* Add more details if needed */}
        </div>
      )}
    </div>
  );
};

export default AwardBursaries;

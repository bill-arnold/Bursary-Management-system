import React, { useState, useEffect } from 'react';
import { awardBursaries, viewApplications } from './api';

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
      const response = await awardBursaries(selectedApplicationId);
      setMessage('Bursary awarded successfully!');
      console.log(response.data);
      // Find the awarded applicant based on the selectedApplicationId
      const awardedApplicant = options.find(application => application.id === selectedApplicationId);
      setAwardedApplicant(awardedApplicant);
    } catch (error) {
      setMessage('An error occurred while awarding the bursary.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Award Bursaries</h2>
      <select onChange={(e) => setSelectedApplicationId(e.target.value)}>
        <option value="">Select an application</option>
        {options.map(application => (
          <option key={application.id} value={application.id}>{`${application.id} - ${application.name}`}</option>
        ))}
      </select>
      <button onClick={handleClick}>Award Bursary</button>
      {message && <p>{message}</p>}
      {awardedApplicant && (
        <div>
          <h3>Awarded Applicant:</h3>
          <p>ID: {awardedApplicant.id}</p>
          <p>Name: {awardedApplicant.name}</p>
          {/* Add more details if needed */}
        </div>
      )}
    </div>
  );
};

export default AwardBursaries;

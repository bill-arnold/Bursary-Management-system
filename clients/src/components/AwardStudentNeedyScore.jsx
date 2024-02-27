// AwardNeedyScore.jsx
import React, { useState, useEffect } from 'react';
import { awardStudentNeedyScore, getAllStudents } from './api';

const AwardNeedyScore = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [score, setScore] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data); // Assuming response.data is the array of students
    } catch (error) {
      console.error(error);
    }
  };

  const handleAwardScore = async () => {
    if (!selectedStudentId) {
      setMessage('Please select a student.');
      return;
    }
    if (!score || isNaN(score)) {
      setMessage('Please enter a valid score.');
      return;
    }
    try {
      const data = { needy_score: score }; // Construct JSON object
      const response = await awardStudentNeedyScore(selectedStudentId, data); // Send JSON object in the request body
      setMessage('Needy score awarded successfully!');
    } catch (error) {
      setMessage('An error occurred while awarding the needy score.');
      console.error(error);
    }
  };

  return (
    <div>
      <select onChange={(e) => setSelectedStudentId(e.target.value)}>
        <option value="">Select a student</option>
        {students && students.map(student => (
          <option key={student.id} value={student.id}>{`${student.id} - ${student.name}`}</option>
        ))}
      </select>
      <input type="text" placeholder="Enter score" value={score} onChange={(e) => setScore(e.target.value)} />
      <button id = 'loginbutton'onClick={handleAwardScore}>Award Needy Score</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AwardNeedyScore;

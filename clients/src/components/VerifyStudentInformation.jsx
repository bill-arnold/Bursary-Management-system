import React, { useState, useEffect } from 'react';
import { verifyStudentInformation, getAllStudents } from './api';

const VerifyStudentInformation = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
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

  const handleVerify = async (isVerified) => {
    try {
      const response = await verifyStudentInformation(selectedStudentId, { verified: isVerified });
      setMessage('Student verification status updated successfully!');
    } catch (error) {
      setMessage('An error occurred while updating the student verification status.');
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
      <button onClick={() => handleVerify(true)}>Verify Student</button>
      <button onClick={() => handleVerify(false)}>Not Verify Student</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyStudentInformation;

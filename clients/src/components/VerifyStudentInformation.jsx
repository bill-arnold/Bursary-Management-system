import React, { useState, useEffect } from 'react';
import { verifyStudentInformation, getAllStudents } from './api';

const VerifyStudentInformation = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
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
      if (!selectedStudentId || !selectedColumn) {
        setMessage('Please select a student and specify the column to update.');
        return;
      }

      const response = await verifyStudentInformation(selectedStudentId, selectedColumn);
      if (isVerified) {
        setMessage('Student verification status updated successfully!');
      } else {
        setMessage('Student not verified.');
      }
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
      <select onChange={(e) => setSelectedColumn(e.target.value)}>
        <option value="">Select column to update</option>
        <option value="verified">Verified</option>
        {/* Add additional options for other columns if needed */}
      </select>
      <button onClick={() => handleVerify(true)}>Verify Student</button>
      <button onClick={() => handleVerify(false)}>Not Verify Student</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyStudentInformation;

// ApproveStudentInformation.jsx
import React, { useState, useEffect } from 'react';
import { approveStudentInformation, getAllStudents } from './api';

const ApproveStudentInformation = () => {
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

  const handleApprove = async () => {
    try {
      const response = await approveStudentInformation(selectedStudentId);
      setMessage('Student approved successfully!');
    } catch (error) {
      setMessage('An error occurred while approving the student.');
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
      <button onClick={handleApprove}>Approve Student</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApproveStudentInformation;

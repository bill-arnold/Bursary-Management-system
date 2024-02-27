import React, { useState, useEffect } from 'react';
import { approveStudentInformation, getAllStudents } from './api';

const ApproveStudentInformation = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async () => {
  try {
    if (approvalStatus === null) {
      setMessage('Please select approval status.');
      return;
    }

    const response = await approveStudentInformation(selectedStudentId);
    const approvalMessage = approvalStatus ? 'Approved' : 'Not Approved';
    setMessage(`Student ${approvalMessage} successfully!`);
  } catch (error) {
    setMessage('An error occurred while updating the approval status.');
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
      <label>
        <input
          type="radio"
          value={true}
          checked={approvalStatus === true}
          onChange={() => setApprovalStatus(true)}
        />
        Approved
      </label>
      <label>
        <input
          type="radio"
          value={false}
          checked={approvalStatus === false}
          onChange={() => setApprovalStatus(false)}
        />
        Not Approved
      </label>
      <button id = 'loginbutton' onClick={handleApprove}>Update Approval Status</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApproveStudentInformation;

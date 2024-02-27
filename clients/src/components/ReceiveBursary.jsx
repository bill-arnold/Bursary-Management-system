import React, { useState, useEffect } from 'react';
import { receiveBursary, getAllStudents } from './api'; // Assuming getAllStudents returns data with both name and ID

const ReceiveBursary = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch students when component mounts
        getAllStudents()
            .then(response => setStudents(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleStudentChange = (e) => {
        setSelectedStudentId(e.target.value);
    };

    const handleClick = async () => {
        try {
            const response = await receiveBursary(selectedStudentId);
            setStudentData(response.data.student_data);
            setErrorMessage('');
        } catch (error) {
            setStudentData(null);
            setErrorMessage('Student not found.');
            console.error(error);
        }
    };

    return (
        <div>
            <select value={selectedStudentId} onChange={handleStudentChange} required>
                <option value="">Select Student</option>
                {students.map(student => (
                    <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
                ))}
            </select>
            <button id = 'loginbutton'onClick={handleClick}>Receive Bursary 💰</button>
            {errorMessage && <p>{errorMessage}</p>}
            {studentData && (
                <div>
                    <p>ID: {studentData.id}</p>
                    <p>Student ID: {studentData.student_id}</p>
                    <p>Bursary ID: {studentData.bursary_id}</p>
                    <p>Amount Allocated: {studentData.amount_allocated}</p>
                    <p>Date Allocated: {studentData.date_allocated}</p>
                    <p>Disbursed: {studentData.disbursed}</p>
                    <p>Date Disbursed: {studentData.date_disbursed}</p>
                </div>
            )}
        </div>
    );
};

export default ReceiveBursary;

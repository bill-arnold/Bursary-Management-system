import React, { useState } from 'react';
import { viewAllStudents } from './api';
import './viewStudents.css'; 



const ViewStudents = () => {
    const [students, setStudents] = useState([]);
    const [showStudents, setShowStudents] = useState(false);

  const handleClick = async () => {
    if (showStudents) {
        setShowStudents(false);
    } else {
        try {
            const response = await viewAllStudents();
            setStudents(response.data);
            setShowStudents(true);
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching the students.');
        }
    }
};


    return (
        <div>
            <button id = 'loginbutton'onClick={handleClick}>View All Students</button>
            {showStudents && students.map(student => (
                <div className="student-card" key={student.id}>
                    <h2>{student.firstname} {student.lastname}</h2>
                    <p>ID: {student.id}</p>
                    <p>Contact Phone Number: {student.contact_phone_number}</p>
                    <p>Gender: {student.gender}</p>
                    <p>Date of Birth: {student.dob}</p>
                    <p>Place of Birth: {student.place_of_birth}</p>
                    <p>Village: {student.village}</p>
                    <p>Ward: {student.ward}</p>
                    <p>Constituency: {student.constituency}</p>
                    <p>Institution Name: {student.institution_name}</p>
                    <p>Institution Code: {student.institution_code}</p>
                    <p>Campus: {student.campus}</p>
                    <p>Level: {student.level}</p>
                    <p>Course: {student.course}</p>
                    <p>Mode of Study: {student.mode_of_study}</p>
                    <p>Expected Completion Year: {student.expected_completion_year}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewStudents;

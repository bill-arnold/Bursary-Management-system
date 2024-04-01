import React, { useState } from 'react';
import { viewAllStudents } from './api';
import './viewStudents.css'; 

const ViewStudents = () => {
    const [students, setStudents] = useState([]);
    const [showStudents, setShowStudents] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleClick = async () => {
        if (showStudents) {
            setShowStudents(false);
            setSearchName('');
            setSelectedStudent(null);
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

    const handleSearch = (e) => {
        setSearchName(e.target.value);
        setSelectedStudent(null); // Clear selected student when searching
    };

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
    };

    return (
        <div>
            <button id="loginbutton" onClick={handleClick}>
                {showStudents ? "Close Students" : "View All Students"}
            </button>
            {showStudents && (
                <div className="dropdown-content">
                    <input
                        type="text"
                        placeholder=""
                        value={searchName}
                        onChange={handleSearch}
                    />
                    {students
                        .filter(student => student.firstname.toLowerCase().includes(searchName.toLowerCase()))
                        .map(student => (
                            <div key={student.id} onClick={() => handleStudentClick(student)}>
                                {student.firstname} {student.lastname}
                            </div>
                        ))}
                </div>
            )}
            {selectedStudent && (
                <div className="student-details">
                    <button id="loginbutton" onClick={() => setSelectedStudent(null)}>Back to List</button>
                    <div>
                        <h2>{selectedStudent.firstname} {selectedStudent.lastname}</h2>
                        <p>ID: {selectedStudent.id}</p>
                        <p>Contact Phone Number: {selectedStudent.contact_phone_number}</p>
                        <p>Gender: {selectedStudent.gender}</p>
                        <p>Date of Birth: {selectedStudent.dob}</p>
                        <p>Place of Birth: {selectedStudent.place_of_birth}</p>
                        <p>Village: {selectedStudent.village}</p>
                        <p>Ward: {selectedStudent.ward}</p>
                        <p>Constituency: {selectedStudent.constituency}</p>
                        <p>Institution Name: {selectedStudent.institution_name}</p>
                        <p>Institution Code: {selectedStudent.institution_code}</p>
                        <p>Campus: {selectedStudent.campus}</p>
                        <p>Level: {selectedStudent.level}</p>
                        <p>Course: {selectedStudent.course}</p>
                        <p>Mode of Study: {selectedStudent.mode_of_study}</p>
                        <p>Expected Completion Year: {selectedStudent.expected_completion_year}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewStudents;

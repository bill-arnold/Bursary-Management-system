import React, { useState, useEffect } from 'react';
import { updateStudentInformation, getAllStudents } from './api'; // Adjust the import path to your api.jsx file

function UpdateStudentInformation() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [studentDetails, setStudentDetails] = useState({
        firstname: '',
        lastname: '',
        contact_phone_number: '',
        photo_url: '',
        gender: '',
        dob: '',
        place_of_birth: '',
        village: '',
        ward: '',
        constituency: '',
        institution_name: '',
        institution_code: '',
        campus: '',
        level: '',
        course: '',
        mode_of_study: '',
        expected_completion_year: ''
    });
    const [message, setMessage] = useState('');

    // Fetch students when component mounts
    useEffect(() => {
        getAllStudents()
            .then(response => setStudents(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleInputChange = (event) => {
        setStudentDetails({
            ...studentDetails,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Call updateStudentInformation function from api.jsx with the selected student ID
        updateStudentInformation(selectedStudent, studentDetails)
            .then(response => {
                // Handle success
                setMessage('Student details updated successfully.');
                setStudentDetails({
                    firstname: '',
                    lastname: '',
                    contact_phone_number: '',
                    photo_url: '',
                    gender: '',
                    dob: '',
                    place_of_birth: '',
                    village: '',
                    ward: '',
                    constituency: '',
                    institution_name: '',
                    institution_code: '',
                    campus: '',
                    level: '',
                    course: '',
                    mode_of_study: '',
                    expected_completion_year: ''
                });
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    };

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Render the form
    return (
        <div>
            <button id = 'loginbutton'onClick={handleToggleDropdown}>Update Student Details</button>
            {showDropdown && (
            <form onSubmit={handleSubmit}>
                <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} required>
                    <option value="">Select Student</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
                    ))}
                </select>
                {/* Input fields for student details */}
                <input type="text" name="firstname" value={studentDetails.firstname} onChange={handleInputChange} placeholder="First Name" required />
                <input type="text" name="lastname" value={studentDetails.lastname} onChange={handleInputChange} placeholder="Last Name" required />
                <input type="text" name="contact_phone_number" value={studentDetails.contact_phone_number} onChange={handleInputChange} placeholder="Contact Phone Number" required />
                <input type="text" name="photo_url" value={studentDetails.photo_url} onChange={handleInputChange} placeholder="Photo URL" />
                <input type="text" name="gender" value={studentDetails.gender} onChange={handleInputChange} placeholder="Gender" required />
                <input type="date" name="dob" value={studentDetails.dob} onChange={handleInputChange} placeholder="Date of Birth" required />
                <input type="text" name="place_of_birth" value={studentDetails.place_of_birth} onChange={handleInputChange} placeholder="Place of Birth" required />
                <input type="text" name="village" value={studentDetails.village} onChange={handleInputChange} placeholder="Village" required />
                <input type="text" name="ward" value={studentDetails.ward} onChange={handleInputChange} placeholder="Ward" required />
                <input type="text" name="constituency" value={studentDetails.constituency} onChange={handleInputChange} placeholder="Constituency" required />
                <input type="text" name="institution_name" value={studentDetails.institution_name} onChange={handleInputChange} placeholder="Institution Name" required />
                <input type="text" name="institution_code" value={studentDetails.institution_code} onChange={handleInputChange} placeholder="Institution Code" required />
                <input type="text" name="campus" value={studentDetails.campus} onChange={handleInputChange} placeholder="Campus" required />
                <input type="text" name="level" value={studentDetails.level} onChange={handleInputChange} placeholder="Level" required />
                <input type="text" name="course" value={studentDetails.course} onChange={handleInputChange} placeholder="Course" required />
                <input type="text" name="mode_of_study" value={studentDetails.mode_of_study} onChange={handleInputChange} placeholder="Mode of Study" required />
                <input type="date" name="expected_completion_year" value={studentDetails.expected_completion_year} onChange={handleInputChange} placeholder="Expected Completion Year" required />
                <button id = 'loginbutton'type="submit">Update  🔄</button>
            </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}

export default UpdateStudentInformation;

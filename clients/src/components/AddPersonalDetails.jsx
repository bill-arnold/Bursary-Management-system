import React, { useState, useEffect } from 'react';
import { addStudent, getAllUsers } from './api'; // adjust the import path to your api.jsx file

function AddStudentInformation() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
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

    // Fetch users when component mounts
    useEffect(() => {
        getAllUsers()
            .then(response => setUsers(response.data))
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

        // Call addStudent function from api.jsx
        addStudent(selectedUser, studentDetails)
            .then(response => {
                // handle success
                setMessage('Student details added successfully.');
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
                // handle error
                console.error(error);
            });
    };

    // Render the form
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} required>
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name} ({user.id})</option>
                    ))}
                </select>
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
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddStudentInformation;

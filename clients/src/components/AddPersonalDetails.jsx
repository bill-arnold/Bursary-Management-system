import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { addStudent, getAllUsers } from './api'; // adjust the import path to your api.jsx file

function AddStudentInformation() {
    const [showDropdown, setShowDropdown] = useState(false);
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to add a new student. Continue?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, add it!',
            cancelButtonText: 'No, cancel',
        });

        if (!isConfirmed) {
            return;
        }

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
                setMessage('Failed to add student. Please try again.');
            });
    };

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Render the form
    return (
        <div>
            <button id = 'loginbutton'onClick={handleToggleDropdown}>Add Students</button>
            {showDropdown && (
            <form id="addBursaryForm"onSubmit={handleSubmit}>
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
                <button id = 'loginbutton'type="submit">Add Student ✏️</button>
            </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddStudentInformation;

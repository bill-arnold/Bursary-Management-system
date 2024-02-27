import React, { useState, useEffect } from 'react';
import { getAllStudents, updateFamilyInformation } from './api';

const UpdateFamilyInformation = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [familyInfo, setFamilyInfo] = useState({
        parent: '',
        first_name: '',
        last_name: '',
        status: '',
        occupation: '',
        main_income_source: '',
        other_income_source: '',
        employed: ''
    });
    const [students, setStudents] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Fetch all students when the component mounts
    useEffect(() => {
        getAllStudents()
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, []);

    const handleChange = (e) => {
        setFamilyInfo({ ...familyInfo, [e.target.name]: e.target.value });
    };

    const handleStudentChange = (e) => {
        setStudentId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateFamilyInformation(studentId, familyInfo);
            console.log(response.data);
            setSuccessMessage('Family details successfully updated!');
            // Clear the form after successful submission
            setFamilyInfo({
                parent: '',
                first_name: '',
                last_name: '',
                status: '',
                occupation: '',
                main_income_source: '',
                other_income_source: '',
                employed: ''
            });
        } catch (error) {
            console.error(error);
            setSuccessMessage('Failed to update family details. Please try again.');
        }
    };

    return (
        <div>
            <button id = 'loginbutton'onClick={handleToggleDropdown}>Update Family Information</button>
            {showDropdown && (
            <form onSubmit={handleSubmit}>
                {/* Dropdown to select student */}
                <select value={studentId} onChange={handleStudentChange}>
                    <option value="">Select a student</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>
                            {`${student.id} - ${student.name}`} {/* Display both ID and name */}
                        </option>
                    ))}
                </select>

                {/* Input fields for family information */}
                <input type="text" name="parent" value={familyInfo.parent} onChange={handleChange} placeholder="Parent's Name" required />
                <input type="text" name="first_name" value={familyInfo.first_name} onChange={handleChange} placeholder="First Name" required />
                <input type="text" name="last_name" value={familyInfo.last_name} onChange={handleChange} placeholder="Last Name" required />
                <input type="text" name="status" value={familyInfo.status} onChange={handleChange} placeholder="Status" required />
                <input type="text" name="occupation" value={familyInfo.occupation} onChange={handleChange} placeholder="Occupation" required />
                <input type="text" name="main_income_source" value={familyInfo.main_income_source} onChange={handleChange} placeholder="Main Income Source" required />
                <input type="text" name="other_income_source" value={familyInfo.other_income_source} onChange={handleChange} placeholder="Other Income Source" required />
                <input type="text" name="employed" value={familyInfo.employed} onChange={handleChange} placeholder="Employed" required />
                <button id = 'loginbutton'type="submit">Update Family Information</button>
            </form>
            )}

            {/* Display success message */}
            {successMessage && <div>{successMessage}</div>}
            
        </div>
    );
};

export default UpdateFamilyInformation;

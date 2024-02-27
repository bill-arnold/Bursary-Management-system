import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getAllStudents, updateEducationFundingHistory } from './api';

const UpdateEducationFundingHistory = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [fundingHistory, setFundingHistory] = useState({
        institution_type: '',
        institution_name: '',
        start_date: '',
        end_date: '',
        funding_source: '',
        details: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch all students when component mounts
        getAllStudents()
            .then(response => setStudents(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleChange = (e) => {
        setFundingHistory({ ...fundingHistory, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { isConfirmed } = await Swal.fire({
                title: 'Confirm Update',
                text: 'Are you sure you want to update education funding history?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, update it!',
                cancelButtonText: 'No, cancel'
            });

            if (isConfirmed) {
                const response = await updateEducationFundingHistory(selectedStudent, fundingHistory);
                console.log(response.data);
                // Display success message
                setMessage('Education funding history updated successfully.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div>
            <button id="loginbutton" onClick={handleToggleDropdown}>Update Education Funding History</button>
            {showDropdown && (
                <form onSubmit={handleSubmit}>
                    <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} required>
                        <option value="">Select Student</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
                        ))}
                    </select>
                    <input type="text" name="institution_type" value={fundingHistory.institution_type} onChange={handleChange} placeholder="Institution Type" required />
                    <input type="text" name="institution_name" value={fundingHistory.institution_name} onChange={handleChange} placeholder="Institution Name" required />
                    <input type="date" name="start_date" value={fundingHistory.start_date} onChange={handleChange} placeholder="Start Date" required />
                    <input type="date" name="end_date" value={fundingHistory.end_date} onChange={handleChange} placeholder="End Date" required />
                    <input type="text" name="funding_source" value={fundingHistory.funding_source} onChange={handleChange} placeholder="Funding Source" required />
                    <input type="text" name="details" value={fundingHistory.details} onChange={handleChange} placeholder="Details" required />
                    <button id="loginbutton" type="submit">Update Education Funding History 🔄</button>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateEducationFundingHistory;

import React, { useState, useEffect } from 'react';
import { updateDeclarations, getAllStudents } from './api';

const UpdateDeclarations = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [declarations, setDeclarations] = useState({
        individual_declaration: '',
        parent_declaration: '',
        religious_leader_declaration: '',
        local_authority_declaration: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch students when component mounts
        getAllStudents()
            .then(response => setStudents(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleChange = (e) => {
        setDeclarations({ ...declarations, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ensure a student is selected before submitting
            if (!selectedStudentId) {
                alert('Please select a student.');
                return;
            }
            
            const response = await updateDeclarations(selectedStudentId, declarations);
            setMessage('Declarations updated successfully.');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div>
            <button id = 'loginbutton'onClick={handleToggleDropdown}>Update Declarations</button>
            {showDropdown && (
            <form onSubmit={handleSubmit}>
                <select value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)} required>
                    <option value="">Select Student</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
                    ))}
                </select>
                <input type="text" name="individual_declaration" value={declarations.individual_declaration} onChange={handleChange} placeholder="Individual Declaration" required />
                <input type="text" name="parent_declaration" value={declarations.parent_declaration} onChange={handleChange} placeholder="Parent Declaration" required />
                <input type="text" name="religious_leader_declaration" value={declarations.religious_leader_declaration} onChange={handleChange} placeholder="Religious Leader Declaration" required />
                <input type="text" name="local_authority_declaration" value={declarations.local_authority_declaration} onChange={handleChange} placeholder="Local Authority Declaration" required />
                <button id = 'loginbutton'type="submit">Update Declarations  🔄</button>
            </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateDeclarations;

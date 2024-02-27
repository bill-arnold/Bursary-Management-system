import React, { useState, useEffect } from 'react';
import { deleteDeclaration, getAllStudents } from './api';

const DeleteDeclaration = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch students when component mounts
        getAllStudents()
            .then(response => setStudents(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = async () => {
    try {
        // Ensure a student is selected before deleting
        if (!selectedStudentId) {
            alert('Please select a student.');
            return;
        }

        const response = await deleteDeclaration(selectedStudentId);
        if (response) {
            setMessage(response.message || 'Declaration deleted successfully.');
            console.log(response);
        } else {
            setMessage('Error deleting declaration: Unknown error occurred.');
        }
    } catch (error) {
        console.error('Error deleting declaration:', error);
        setMessage('Error deleting declaration: ' + error.message);
    }
};


    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div>
            <button id = 'loginbutton'onClick={handleToggleDropdown}>Delete Declaration</button>
            {showDropdown && (
                <div>
                    <select value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)} required>
                        <option value="">Select Student</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
                        ))}
                    </select>
                    <button id = 'loginbutton' onClick={handleDelete}>Delete Declaration 🗑️</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteDeclaration;

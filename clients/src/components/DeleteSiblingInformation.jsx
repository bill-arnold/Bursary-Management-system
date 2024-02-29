import React, { useState, useEffect } from 'react';
import { deleteSiblingInformation, getAllStudents } from './api';

const DeleteSiblingInformation = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Fetch all students when component mounts
        getAllStudents()
            .then(response => setStudents(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = async () => {
        try {
            
            const response = await deleteSiblingInformation(selectedStudent);
            console.log(response.data);
            setMessage('Sibling information deleted successfully.');
        } catch (error) {
            console.error(error);
            setMessage('Failed to delete sibling information. Please try again.');
        }
    };

    return (
        <div>
            <button id = 'loginbutton'onClick={() => setShowForm(!showForm)}>Delete Sibling Form</button>
            {showForm && (
                <div>
                    <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} required>
                        <option value="">Select Student</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
                        ))}
                    </select>
                    <button id = 'loginbutton'onClick={handleDelete}>Delete Sibling Information 🗑️</button>
                    {message && <p>{message}</p>}
                </div>
            )}
        </div>
    );
};

export default DeleteSiblingInformation;

import React, { useState, useEffect } from 'react';
import { addDeclarations, getAllStudents } from './api';

const AddDeclarations = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
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
            const response = await addDeclarations(selectedStudent, declarations);
            setMessage('Declarations added successfully.');
            setDeclarations({
                individual_declaration: '',
                parent_declaration: '',
                religious_leader_declaration: '',
                local_authority_declaration: ''
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} required>
                    <option value="">Select Student</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
                    ))}
                </select>
                <input type="text" name="individual_declaration" value={declarations.individual_declaration} onChange={handleChange} placeholder="Individual Declaration" required />
                <input type="text" name="parent_declaration" value={declarations.parent_declaration} onChange={handleChange} placeholder="Parent Declaration" required />
                <input type="text" name="religious_leader_declaration" value={declarations.religious_leader_declaration} onChange={handleChange} placeholder="Religious Leader Declaration" required />
                <input type="text" name="local_authority_declaration" value={declarations.local_authority_declaration} onChange={handleChange} placeholder="Local Authority Declaration" required />
                <button type="submit">Add Declarations</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddDeclarations;

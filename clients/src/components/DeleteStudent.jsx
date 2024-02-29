import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { deleteStudent, getAllStudents } from './api';

const DeleteStudent = () => {
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
            const { isConfirmed } = await Swal.fire({
                title: 'Are you sure?',
                text: 'You are about to delete the student. Continue?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel',
            });

            if (!isConfirmed) {
                return;
            }

            const response = await deleteStudent(selectedStudent);
            console.log(response.data);
            setMessage('Student deleted successfully.');
        } catch (error) {
            console.error(error);
            setMessage('Failed to delete student. Please try again.');
        }
    };

    return (
        <div>
            <button id='loginbutton' onClick={() => setShowForm(!showForm)}>Delete Student Form</button>
            {showForm && (
                <div>
                    <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} required>
                        <option value="">Select Student</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
                        ))}
                    </select>
                    <button id='loginbutton'onClick={handleDelete}>Delete Student 🗑️</button>
                    {message && <p>{message}</p>}
                </div>
            )}
        </div>
    );
};

export default DeleteStudent;

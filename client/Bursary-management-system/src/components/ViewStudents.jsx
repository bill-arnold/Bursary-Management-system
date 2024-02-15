import React, { useState, useEffect } from 'react';
import { viewStudents } from './api';  // You would need to define this function in api.jsx

const ViewStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await viewStudents();
                setStudents(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Students</h1>
            {students.map((student, index) => (
                <div key={index}>
                    <h2>{student.name}</h2>
                    <p>{student.institution}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewStudents;

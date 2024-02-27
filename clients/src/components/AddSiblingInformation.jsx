import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { addSiblingInformation, getAllStudents } from './api';

const AddSiblingInformation = () => {
    const [studentId, setStudentId] = useState('');
    const [siblingInfo, setSiblingInfo] = useState({
        name: '',
        relationship: '',
        institution: '',
        level: '',
        total_annual_fees: '',
        paid: ''
    });
    const [students, setStudents] = useState([]);

    const handleChange = (e) => {
        setSiblingInfo({ ...siblingInfo, [e.target.name]: e.target.value });
    };

    const handleStudentChange = (e) => {
        setStudentId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { isConfirmed } = await Swal.fire({
                title: 'Are you sure?',
                text: 'You are about to add sibling information. Continue?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, add it!',
                cancelButtonText: 'No, cancel',
            });

            if (!isConfirmed) {
                return;
            }

            const response = await addSiblingInformation(studentId, siblingInfo);
            console.log(response.data);
            Swal.fire('Success', 'Sibling information added successfully!', 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to add sibling information. Please try again.', 'error');
        }
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getAllStudents();
                setStudents(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudents();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <select value={studentId} onChange={handleStudentChange}>
                <option value="">Select Student</option>
                {students.map(student => (
                    <option key={student.id} value={student.id}>{`${student.id} - ${student.name}`}</option>
                ))}
            </select>
            <input type="text" name="name" value={siblingInfo.name} onChange={handleChange} placeholder="Sibling Name" required />
            <input type="text" name="relationship" value={siblingInfo.relationship} onChange={handleChange} placeholder="Relationship" required />
            <input type="text" name="institution" value={siblingInfo.institution} onChange={handleChange} placeholder="Institution" required />
            <input type="text" name="level" value={siblingInfo.level} onChange={handleChange} placeholder="Level" required />
            <input type="number" name="total_annual_fees" value={siblingInfo.total_annual_fees} onChange={handleChange} placeholder="Total Annual Fees" required />
            <input type="number" name="paid" value={siblingInfo.paid} onChange={handleChange} placeholder="Amount Paid" required />
            <button id = 'loginbutton'type="submit">Add Sibling Information ✏️</button>
        </form>
    );
};

export default AddSiblingInformation;

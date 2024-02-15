import React, { useState } from 'react';
import { addSiblingInformation } from './api';

const AddSiblingInformation = ({ studentId }) => {
    const [siblingInfo, setSiblingInfo] = useState({
        name: '',
        relationship: '',
        institution: '',
        level: '',
        total_annual_fees: '',
        paid: ''
    });

    const handleChange = (e) => {
        setSiblingInfo({ ...siblingInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addSiblingInformation(studentId, siblingInfo);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={siblingInfo.name} onChange={handleChange} placeholder="Sibling Name" required />
            <input type="text" name="relationship" value={siblingInfo.relationship} onChange={handleChange} placeholder="Relationship" required />
            <input type="text" name="institution" value={siblingInfo.institution} onChange={handleChange} placeholder="Institution" required />
            <input type="text" name="level" value={siblingInfo.level} onChange={handleChange} placeholder="Level" required />
            <input type="number" name="total_annual_fees" value={siblingInfo.total_annual_fees} onChange={handleChange} placeholder="Total Annual Fees" required />
            <input type="number" name="paid" value={siblingInfo.paid} onChange={handleChange} placeholder="Amount Paid" required />
            <button type="submit">Add Sibling Information</button>
        </form>
    );
};

export default AddSiblingInformation;

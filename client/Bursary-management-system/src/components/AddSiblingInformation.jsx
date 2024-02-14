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
            {/* Add input fields for each property in siblingInfo */}
            <button type="submit">Add Sibling Information</button>
        </form>
    );
};

export default AddSiblingInformation;

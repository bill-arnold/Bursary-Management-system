import React, { useState } from 'react';
import { addEducationFundingHistory } from './api';

const AddEducationFundingHistory = ({ studentId }) => {
    const [fundingHistory, setFundingHistory] = useState({
        institution_type: '',
        institution_name: '',
        start_date: '',
        end_date: '',
        funding_source: '',
        details: ''
    });

    const handleChange = (e) => {
        setFundingHistory({ ...fundingHistory, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addEducationFundingHistory(studentId, fundingHistory);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="institution_type" value={fundingHistory.institution_type} onChange={handleChange} placeholder="Institution Type" required />
            <input type="text" name="institution_name" value={fundingHistory.institution_name} onChange={handleChange} placeholder="Institution Name" required />
            <input type="date" name="start_date" value={fundingHistory.start_date} onChange={handleChange} placeholder="Start Date" required />
            <input type="date" name="end_date" value={fundingHistory.end_date} onChange={handleChange} placeholder="End Date" required />
            <input type="text" name="funding_source" value={fundingHistory.funding_source} onChange={handleChange} placeholder="Funding Source" required />
            <input type="text" name="details" value={fundingHistory.details} onChange={handleChange} placeholder="Details" required />
            <button type="submit">Add Education Funding History</button>
        </form>
    );
};

export default AddEducationFundingHistory;

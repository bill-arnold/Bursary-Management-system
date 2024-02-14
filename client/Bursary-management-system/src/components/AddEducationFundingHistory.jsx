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
            {/* Add input fields for each property in fundingHistory */}
            <button type="submit">Add Education Funding History</button>
        </form>
    );
};

export default AddEducationFundingHistory;

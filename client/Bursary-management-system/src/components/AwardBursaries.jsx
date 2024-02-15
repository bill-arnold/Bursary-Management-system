import React from 'react';
import { awardBursaries } from './api';  // You would need to define this function in api.jsx

const AwardBursaries = ({ applicationId }) => {
    const handleClick = async () => {
        try {
            const response = await awardBursaries(applicationId);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handleClick}>Award Bursary</button>
    );
};

export default AwardBursaries;

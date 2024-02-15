import React from 'react';
import { rejectRequest } from './api';  // You would need to define this function in api.jsx

const RejectRequest = ({ applicationId }) => {
    const handleClick = async () => {
        try {
            const response = await rejectRequest(applicationId);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handleClick}>Reject Request</button>
    );
};

export default RejectRequest;

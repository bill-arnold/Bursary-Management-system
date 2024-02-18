import React, { useState } from 'react';
import { rejectRequest } from './api';

const RejectRequest = ({ applicationId }) => {
    const [message, setMessage] = useState('');

    const handleClick = async () => {
        try {
            const response = await rejectRequest(applicationId);
            setMessage('Request rejected successfully!');
            console.log(response.data);
        } catch (error) {
            setMessage('An error occurred while rejecting the request.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Reject Request</h2>
            <button onClick={handleClick}>Reject Request</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RejectRequest;

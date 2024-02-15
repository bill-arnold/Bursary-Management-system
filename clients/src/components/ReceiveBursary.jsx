import React from 'react';
import { receiveBursary } from './api';

const ReceiveBursary = ({ studentId }) => {
    const handleClick = async () => {
        try {
            const response = await receiveBursary(studentId);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handleClick}>Receive Bursary</button>
    );
};

export default ReceiveBursary;

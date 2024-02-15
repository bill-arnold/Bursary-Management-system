import React, { useState } from 'react';
import { verifyStudentInformation } from './api';  // You would need to define this function in api.jsx

const VerifyStudentInformation = ({ studentId }) => {
    const [verified, setVerified] = useState(false);

    const handleClick = async () => {
        try {
            const response = await verifyStudentInformation(studentId);
            console.log(response.data);
            setVerified(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Verify Student Information</button>
            {verified && <p>Student information verified.</p>}
        </div>
    );
};

export default VerifyStudentInformation;

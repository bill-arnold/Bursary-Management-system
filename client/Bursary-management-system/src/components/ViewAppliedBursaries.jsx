import React, { useState, useEffect } from 'react';
import { viewAppliedBursaries } from './api';  // You would need to define this function in api.jsx

const ViewAppliedBursaries = ({ studentId }) => {
    const [bursaries, setBursaries] = useState([]);

    useEffect(() => {
        const fetchBursaries = async () => {
            try {
                const response = await viewAppliedBursaries(studentId);
                setBursaries(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBursaries();
    }, [studentId]);

    return (
        <div>
            <h1>Applied Bursaries</h1>
            {bursaries.map((bursary, index) => (
                <div key={index}>
                    <h2>{bursary.name}</h2>
                    <p>{bursary.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewAppliedBursaries;

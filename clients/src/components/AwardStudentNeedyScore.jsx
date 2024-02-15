import React, { useState } from 'react';
import { awardStudentNeedyScore } from './api';  // You would need to define this function in api.jsx

const AwardStudentNeedyScore = ({ studentId }) => {
    const [needyScore, setNeedyScore] = useState('');

    const handleChange = (e) => {
        setNeedyScore(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await awardStudentNeedyScore(studentId, needyScore);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="needyScore" value={needyScore} onChange={handleChange} placeholder="Needy Score" required />
            <button type="submit">Award Needy Score</button>
        </form>
    );
};

export default AwardStudentNeedyScore;

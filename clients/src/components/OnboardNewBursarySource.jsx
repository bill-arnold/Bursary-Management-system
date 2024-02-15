import React, { useState } from 'react';
import { onboardNewBursarySource } from '/src/components/api';
 

const OnboardNewSourcesOfBursary = () => {
    const [sourceInfo, setSourceInfo] = useState({
        name: '',
        contact: '',
        amount: ''
    });

    const handleChange = (e) => {
        setSourceInfo({ ...sourceInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await onboardNewBursarySource(sourceInfo);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={sourceInfo.name} onChange={handleChange} placeholder="Source Name" required />
            <input type="text" name="contact" value={sourceInfo.contact} onChange={handleChange} placeholder="Contact" required />
            <input type="number" name="amount" value={sourceInfo.amount} onChange={handleChange} placeholder="Amount" required />
            <button type="submit">Onboard New Source of Bursary</button>
        </form>
    );
};

export default OnboardNewSourcesOfBursary;

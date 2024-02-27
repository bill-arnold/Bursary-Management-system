import React, { useState } from 'react';
import { createNewBursary } from './api';

const OnboardNewBursary = () => {
    const initialState = {
        title: '',
        description: '',
        fund_amount: '',
        contact_person: '',
        photo_url: ''
    };

    const [bursary, setBursary] = useState(initialState);

    const handleChange = (e) => {
        setBursary({
            ...bursary,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createNewBursary(bursary);
            alert('New bursary onboarded successfully!');
            setBursary(initialState); // Reset the state to clear the input fields
        } catch (error) {
            console.error(error);
            alert('An error occurred while onboarding the new bursary.');
        }
    };

    return (
        <form id="addBursaryForm" onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={bursary.title} onChange={handleChange} required />
            </label>
            <label>
                Description:
                <textarea name="description" value={bursary.description} onChange={handleChange} required />
            </label>
            <label>
                Fund Amount:
                <input type="number" name="fund_amount" value={bursary.fund_amount} onChange={handleChange} required />
            </label>
            <label>
                Contact Person:
                <input type="text" name="contact_person" value={bursary.contact_person} onChange={handleChange} required />
            </label>
            <label>
                Photo URL:
                <input type="text" name="photo_url" value={bursary.photo_url} onChange={handleChange} />
            </label>
            <button id = 'loginbutton'type="submit">Onboard New Bursary ➕</button>
        </form>
    );
};

export default OnboardNewBursary;

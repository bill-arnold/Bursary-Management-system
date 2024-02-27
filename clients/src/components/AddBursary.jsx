// AddBursary.jsx

import React, { useState } from 'react';
import { createNewBursary } from './api';
import './AddBursary.css'; // Import the stylesheet

const AddBursary = () => {
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
            alert('Bursary added successfully!');
            setBursary(initialState); // Reset the state to clear the input fields
        } catch (error) {
            console.error(error);
            alert('An error occurred while adding the bursary.');
        }
    };

    return (
        <form id="addBursaryForm" onSubmit={handleSubmit}>
            <label htmlFor="title">
                Title:
                <input type="text" id="title" name="title" value={bursary.title} onChange={handleChange} required />
            </label>
            <label htmlFor="description">
                Description:
                <textarea id="description" name="description" value={bursary.description} onChange={handleChange} required />
            </label>
            <label htmlFor="fundAmount">
                Fund Amount:
                <input type="number" id="fundAmount" name="fund_amount" value={bursary.fund_amount} onChange={handleChange} required />
            </label>
            <label htmlFor="contactPerson">
                Contact Person:
                <input type="text" id="contactPerson" name="contact_person" value={bursary.contact_person} onChange={handleChange} required />
            </label>
            <label htmlFor="photoUrl">
                Photo URL:
                <input type="text" id="photoUrl" name="photo_url" value={bursary.photo_url} onChange={handleChange} />
            </label>
            <button id = 'loginbutton' type="submit" >Add Bursary</button>
        </form>
    );
};

export default AddBursary;

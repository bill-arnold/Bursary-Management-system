import React, { useState } from 'react';
import Swal from 'sweetalert2';
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
            const { isConfirmed } = await Swal.fire({
                title: 'Confirm Onboarding',
                text: 'Are you sure you want to onboard this new bursary?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, onboard it!',
                cancelButtonText: 'No, cancel'
            });

            if (isConfirmed) {
                await createNewBursary(bursary);
                Swal.fire('Success', 'New bursary onboarded successfully!', 'success');
                setBursary(initialState); // Reset the state to clear the input fields
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'An error occurred while onboarding the new bursary.', 'error');
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
            <button id="loginbutton" type="submit">Onboard New Bursary ➕</button>
        </form>
    );
};

export default OnboardNewBursary;

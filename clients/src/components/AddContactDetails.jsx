import React, { useState } from 'react';
import { addContactDetails } from './api';

const AddContactDetails = ({ userId }) => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState(''); // New state for email

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e) => { // New handleChange function for email
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addContactDetails(userId, { phone, email }); // Include email in the data
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="tel" name="phone" value={phone} onChange={handlePhoneChange} placeholder="Phone" required />
            <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email" required /> {/* New email input field */}
            <button type="submit">Add Contact Details</button>
        </form>
    );
};

export default AddContactDetails;

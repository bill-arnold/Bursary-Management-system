import React, { useState } from 'react';
import { addContactDetails } from './api';

const AddContactDetails = ({ userId }) => {
    const [phone, setPhone] = useState('');

    const handleChange = (e) => {
        setPhone(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addContactDetails(userId, { phone });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="tel" name="phone" value={phone} onChange={handleChange} placeholder="Phone" required />
            <button type="submit">Add Contact Details</button>
        </form>
    );
};

export default AddContactDetails;

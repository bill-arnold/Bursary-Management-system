/*
import React, { useState, useEffect } from 'react';
import { getAllUsers, addContactDetails } from './api';

const AddContactDetails = () => {
    const [userId, setUserId] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);

    const handleUserChange = (e) => {
        setUserId(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add contact details for the selected user
            const response = await addContactDetails(userId, { phone, email });
            console.log(response.data);
            // Display success message here
            alert('Contact details added successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Fetch all users when component mounts
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <select value={userId} onChange={handleUserChange}>
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{`${user.id} - ${user.name}`}</option>
                ))}
            </select>
            <input type="tel" name="phone" value={phone} onChange={handlePhoneChange} placeholder="Phone" required />
            <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email" required />
            <button type="submit">Add Contact Details</button>
        </form>
    );
};

export default AddContactDetails;*/

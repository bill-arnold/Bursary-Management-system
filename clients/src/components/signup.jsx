import React, { useState } from 'react';
import { signUp } from './api';

const SignUp = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        id_no: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signUp(userData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
            <input type="tel" name="phone" value={userData.phone} onChange={handleChange} placeholder="Phone" required />
            <input type="text" name="role" value={userData.role} onChange={handleChange} placeholder="Role" required />
            <input type="number" name="id_no" value={userData.id_no} onChange={handleChange} placeholder="ID Number" required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;

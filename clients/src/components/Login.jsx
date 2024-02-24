import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, makeAuthenticatedRequest, refreshToken, isTokenExpired } from './api';

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(userData.email, userData.password);
            setSuccessMessage('Logged in successfully!');
            // Check if access token is expired, and refresh it if necessary
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken || isTokenExpired(accessToken)) {
                await refreshToken();
            }
            // Now you can make authenticated requests using makeAuthenticatedRequest function
            const data = await makeAuthenticatedRequest('/protected-endpoint', { method: 'GET' });
            console.log('Authenticated request result:', data);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setError('Invalid email or password. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <form id="addBursaryForm"onSubmit={handleSubmit}>
            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

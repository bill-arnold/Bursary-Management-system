import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Typography, Container, CssBaseline, Avatar, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ResetPassword from './ResetPassword';
import { login, makeAuthenticatedRequest, refreshToken, isTokenExpired } from './api';

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    {successMessage && <Typography color="success">{successMessage}</Typography>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/reset-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                    <ResetPassword />
                </form>
            </div>
        </Container>
    );
};

export default Login;

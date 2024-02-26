import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from './api';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  AppBar,
  Toolbar,
  CssBaseline,
} from '@mui/material';

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    id_no: '',
    password: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(userData);
      console.log(response.data);
      setSuccessMessage('User signed up successfully!');
      navigate('/logIn');
    } catch (error) {
      console.error(error);
      setError('Failed to sign up. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={{ backgroundColor: '#2c3e50', alignItems: 'center' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Bursary Management System</Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5" align="center">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={userData.phone}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="ID Number"
              name="id_no"
              type="number"
              value={userData.id_no}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            {error && <Typography color="error">{error}</Typography>}
            {successMessage && (
              <Typography color="success">{successMessage}</Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
            Already have an account? <Link to="/logIn">Log In</Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;

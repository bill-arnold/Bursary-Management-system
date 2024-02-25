import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your existing dashboard components...
//import Dashboard from '@src/components/Dashboard';
import Dashboard from './components/dashboard';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
    return (
        <Router>
                <Routes>
                    <Route path="*" element={<LandingPage />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<SignUp/>} />
                    <Route path="/dashboard/*" element={<Dashboard />}/>
                </Routes>
        </Router>
    );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your existing dashboard components...
//import Dashboard from '@src/components/Dashboard';
import Dashboard from './components/dashboard';

const App = () => {
    return (
        <Router>
                <Routes>
                    <Route path="*" element={<Dashboard />} />
                </Routes>
        </Router>
    );
}

export default App;

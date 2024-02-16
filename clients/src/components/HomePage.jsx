import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Homepage</h1>
            <ul>
                <li><Link to="/applicants">Sign Up</Link></li>
                <li><Link to="/applicants/add-contact-details">Add Contact Details</Link></li>
                <li><Link to="/applicants/add-family-information">Add Family Information</Link></li>
                <li><Link to="/applicants/add-sibling-information">Add Sibling Information</Link></li>
                <li><Link to="/applicants/add-institution-information">Add Institution Information</Link></li>
                <li><Link to="/applicants/add-personal-details">Add Personal Details</Link></li>
                <li><Link to="/applicants/add-declarations">Add Declarations</Link></li>
                <li><Link to="/applicants/add-education-funding-history">Add Education Funding History</Link></li>
                <li><Link to="/applicants/receive-bursary">Receive Bursary</Link></li>
                <li><Link to="/admin/verify-student-information">Verify Student Information</Link></li>
                <li><Link to="/admin/award-student-needy-score">Award Student Needy Score</Link></li>
                <li><Link to="/admin/onboard-new-bursary-source">Onboard New Bursary Source</Link></li>
                <li><Link to="/admin/view-applied-bursaries">View Applied Bursaries</Link></li>
                <li><Link to="/sponsors/award-bursaries">Award Bursaries</Link></li>
                <li><Link to="/sponsors/view-students">View Students</Link></li>
                <li><Link to="/sponsors/reject-request">Reject Request</Link></li>
            </ul>
        </div>
    );
};

export default HomePage;

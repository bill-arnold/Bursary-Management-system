import React, { useState } from 'react';
import { viewApplications } from './api';

const ViewAppliedBursaries = () => {
    const [applications, setApplications] = useState([]);
    const [showApplications, setShowApplications] = useState(false);

    const handleClick = async () => {
        if (showApplications) {
            setShowApplications(false);
        } else {
            try {
                const response = await viewApplications();
                setApplications(response.data);
                setShowApplications(true);
            } catch (error) {
                console.error(error);
                alert('An error occurred while fetching the applications.');
            }
        }
    };

    return (
        <div>
            <button id = 'loginbutton'onClick={handleClick}>View Applied Bursaries</button>
            {showApplications && applications.map(application => (
                <div className="application-card" key={application.id}>
                    <h2>{application.title}</h2>
                    <p>ID: {application.id}</p>
                    <p>Description: {application.description}</p>
                    <p>Fund Amount: {application.fund_amount}</p>
                    <p>Contact Person: {application.contact_person}</p>
                    <img src={application.photo_url} alt={application.title} />
                </div>
            ))}
        </div>
    );
};

export default ViewAppliedBursaries;

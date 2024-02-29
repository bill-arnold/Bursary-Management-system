import React, { useState, useEffect } from 'react';
import { viewApplications } from './api';

const ViewAppliedBursaries = () => {
    const [applications, setApplications] = useState([]);
    const [showApplications, setShowApplications] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        async function fetchApplications() {
            try {
                const response = await viewApplications();
                setApplications(response.data);
            } catch (error) {
                console.error(error);
                alert('An error occurred while fetching the applications.');
            }
        }
        fetchApplications();
    }, []);

    const handleViewClick = () => {
        setShowApplications(!showApplications);
        setSelectedApplication(null); // Deselect application when closing
    };

    const handleApplicationClick = (application) => {
        if (selectedApplication && selectedApplication.id === application.id) {
            // Deselect the application if it's already selected
            setSelectedApplication(null);
        } else {
            setSelectedApplication(application);
        }
    };

    return (
        <div>
            <button id="loginbutton"onClick={handleViewClick}>
                {showApplications ? 'Close Bursaries' : 'View Applied Bursaries'}
            </button>
            {showApplications && (
                <div>
                    <h1>Applied Bursaries</h1>
                    <ul>
                        {applications.map(application => (
                            <li key={application.id} onClick={() => handleApplicationClick(application)}>
                                {application.title}
                            </li>
                        ))}
                    </ul>
                    {selectedApplication && (
                        <div>
                            <h2>{selectedApplication.title}</h2>
                            <p>ID: {selectedApplication.id}</p>
                            <p>Description: {selectedApplication.description}</p>
                            <p>Fund Amount: {selectedApplication.fund_amount}</p>
                            <p>Contact Person: {selectedApplication.contact_person}</p>
                            <img src={selectedApplication.photo_url} alt={selectedApplication.title} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewAppliedBursaries;

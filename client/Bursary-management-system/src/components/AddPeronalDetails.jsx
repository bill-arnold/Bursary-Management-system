import React, { useState } from 'react';
import { addPersonalDetails } from './api';

const AddPersonalDetails = ({ studentId }) => {
    const [personalDetails, setPersonalDetails] = useState({
        firstname: '',
        lastname: '',
        contact_phone_number: '',
        photo_url: '',
        gender: '',
        dob: '',
        place_of_birth: '',
        village: '',
        ward: '',
        constituency: ''
    });

    const handleChange = (e) => {
        setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addPersonalDetails(studentId, personalDetails);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add input fields for each property in personalDetails */}
            <button type="submit">Add Personal Details</button>
        </form>
    );
};

export default AddPersonalDetails;

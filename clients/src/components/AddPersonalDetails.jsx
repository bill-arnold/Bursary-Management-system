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
            <input type="text" name="firstname" value={personalDetails.firstname} onChange={handleChange} placeholder="First Name" required />
            <input type="text" name="lastname" value={personalDetails.lastname} onChange={handleChange} placeholder="Last Name" required />
            <input type="tel" name="contact_phone_number" value={personalDetails.contact_phone_number} onChange={handleChange} placeholder="Contact Phone Number" required />
            <input type="text" name="photo_url" value={personalDetails.photo_url} onChange={handleChange} placeholder="Photo URL" />
            <input type="text" name="gender" value={personalDetails.gender} onChange={handleChange} placeholder="Gender" required />
            <input type="date" name="dob" value={personalDetails.dob} onChange={handleChange} placeholder="Date of Birth" required />
            <input type="text" name="place_of_birth" value={personalDetails.place_of_birth} onChange={handleChange} placeholder="Place of Birth" required />
            <input type="text" name="village" value={personalDetails.village} onChange={handleChange} placeholder="Village" required />
            <input type="text" name="ward" value={personalDetails.ward} onChange={handleChange} placeholder="Ward" required />
            <input type="text" name="constituency" value={personalDetails.constituency} onChange={handleChange} placeholder="Constituency" required />
            <button type="submit">Add Personal Details</button>
        </form>
    );
};

export default AddPersonalDetails;

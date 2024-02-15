import React, { useState } from 'react';
import { addFamilyInformation } from './api';

const AddFamilyInformation = ({ studentId }) => {
    const [familyInfo, setFamilyInfo] = useState({
        parent: '',
        first_name: '',
        last_name: '',
        status: '',
        occupation: '',
        main_income_source: '',
        other_income_source: '',
        employed: ''
    });

    const handleChange = (e) => {
        setFamilyInfo({ ...familyInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addFamilyInformation(studentId, familyInfo);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="parent" value={familyInfo.parent} onChange={handleChange} placeholder="Parent's Name" required />
            <input type="text" name="first_name" value={familyInfo.first_name} onChange={handleChange} placeholder="First Name" required />
            <input type="text" name="last_name" value={familyInfo.last_name} onChange={handleChange} placeholder="Last Name" required />
            <input type="text" name="status" value={familyInfo.status} onChange={handleChange} placeholder="Status" required />
            <input type="text" name="occupation" value={familyInfo.occupation} onChange={handleChange} placeholder="Occupation" required />
            <input type="text" name="main_income_source" value={familyInfo.main_income_source} onChange={handleChange} placeholder="Main Income Source" required />
            <input type="text" name="other_income_source" value={familyInfo.other_income_source} onChange={handleChange} placeholder="Other Income Source" required />
            <input type="text" name="employed" value={familyInfo.employed} onChange={handleChange} placeholder="Employed" required />
            <button type="submit">Add Family Information</button>
        </form>
    );
};

export default AddFamilyInformation;

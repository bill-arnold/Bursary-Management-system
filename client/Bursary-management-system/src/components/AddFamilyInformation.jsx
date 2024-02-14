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
            {/* Add input fields for each property in familyInfo */}
            <button type="submit">Add Family Information</button>
        </form>
    );
};

export default AddFamilyInformation;

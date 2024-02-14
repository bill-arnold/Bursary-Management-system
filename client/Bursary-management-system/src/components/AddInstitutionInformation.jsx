import React, { useState } from 'react';
import { addInstitutionInformation } from './api';

const AddInstitutionInformation = ({ studentId }) => {
    const [institutionInfo, setInstitutionInfo] = useState({
        institution_name: '',
        institution_code: '',
        campus: '',
        level: '',
        course: '',
        mode_of_study: '',
        expected_completion_year: ''
    });

    const handleChange = (e) => {
        setInstitutionInfo({ ...institutionInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addInstitutionInformation(studentId, institutionInfo);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add input fields for each property in institutionInfo */}
            <button type="submit">Add Institution Information</button>
        </form>
    );
};

export default AddInstitutionInformation;

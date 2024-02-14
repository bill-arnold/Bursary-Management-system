import React, { useState } from 'react';
import { addDeclarations } from './api';

const AddDeclarations = ({ studentId }) => {
    const [declarations, setDeclarations] = useState({
        declaration1: '',
        declaration2: '',
        declaration3: ''
    });

    const handleChange = (e) => {
        setDeclarations({ ...declarations, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addDeclarations(studentId, declarations);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add input fields for each property in declarations */}
            <button type="submit">Add Declarations</button>
        </form>
    );
};

export default AddDeclarations;

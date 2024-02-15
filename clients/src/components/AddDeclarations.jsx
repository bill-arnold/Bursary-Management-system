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
            <input type="text" name="declaration1" value={declarations.declaration1} onChange={handleChange} placeholder="Declaration 1" required />
            <input type="text" name="declaration2" value={declarations.declaration2} onChange={handleChange} placeholder="Declaration 2" required />
            <input type="text" name="declaration3" value={declarations.declaration3} onChange={handleChange} placeholder="Declaration 3" required />
            <button type="submit">Add Declarations</button>
        </form>
    );
};

export default AddDeclarations;

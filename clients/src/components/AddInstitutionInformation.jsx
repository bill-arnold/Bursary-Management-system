/*import React, { useState, useEffect } from 'react';
import { getAllStudents, addInstitutionInformation } from './api';

const AddInstitutionInformation = () => {
    const [studentId, setStudentId] = useState('');
    const [institutionInfo, setInstitutionInfo] = useState({
        institution_name: '',
        institution_code: '',
        campus: '',
        level: '',
        course: '',
        mode_of_study: '',
        expected_completion_year: ''
    });
    const [students, setStudents] = useState([]);

    const handleChange = (e) => {
        setInstitutionInfo({ ...institutionInfo, [e.target.name]: e.target.value });
    };

    const handleStudentChange = (e) => {
        setStudentId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addInstitutionInformation(studentId, institutionInfo);
            console.log(response.data);
            // Display success message here
            alert('Institution information added successfully!');
            // Reset form fields after successful submission
            setInstitutionInfo({
                institution_name: '',
                institution_code: '',
                campus: '',
                level: '',
                course: '',
                mode_of_study: '',
                expected_completion_year: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getAllStudents();
                setStudents(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudents();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <select value={studentId} onChange={handleStudentChange}>
                <option value="">Select Student</option>
                {students.map(student => (
                    <option key={student.id} value={student.id}>{`${student.id} - ${student.name}`}</option>
                ))}
            </select>
            <input type="text" name="institution_name" value={institutionInfo.institution_name} onChange={handleChange} placeholder="Institution Name" required />
            <input type="text" name="institution_code" value={institutionInfo.institution_code} onChange={handleChange} placeholder="Institution Code" required />
            <input type="text" name="campus" value={institutionInfo.campus} onChange={handleChange} placeholder="Campus" required />
            <input type="text" name="level" value={institutionInfo.level} onChange={handleChange} placeholder="Level" required />
            <input type="text" name="course" value={institutionInfo.course} onChange={handleChange} placeholder="Course" required />
            <input type="text" name="mode_of_study" value={institutionInfo.mode_of_study} onChange={handleChange} placeholder="Mode of Study" required />
            <input type="date" name="expected_completion_year" value={institutionInfo.expected_completion_year} onChange={handleChange} placeholder="Expected Completion Year" required />
            <button type="submit">Add Institution Information</button>
        </form>
    );
};

export default AddInstitutionInformation;*/

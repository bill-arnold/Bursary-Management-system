import React, { useState, useEffect } from 'react';
import {
  getAllBeneficiaries,
  getAllParentGuardians,
  getAllSiblings,
  getAllEducationFundingHistories,
  //getAllBursaries,
  getAllStudents,
} from './api'; // Import the data retrieval functions

const AdminView = () => {
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [students, setStudents] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [parentGuardians, setParentGuardians] = useState([]);
  const [siblings, setSiblings] = useState([]);
  const [educationFundingHistories, setEducationFundingHistories] = useState([]);
  //const [bursaries, setBursaries] = useState([]);

  useEffect(() => {
    getAllStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const fetchDataForStudent = () => {
    Promise.all([
      getAllBeneficiaries(),
      getAllParentGuardians(),
      getAllSiblings(),
      getAllEducationFundingHistories(),
      //getAllBursaries()
    ])
      .then(([beneficiariesRes, parentGuardiansRes, siblingsRes, educationFundingHistoriesRes, bursariesRes]) => {
        setBeneficiaries(beneficiariesRes.data.filter((beneficiary) => beneficiary.student_id === selectedStudentId));
        setParentGuardians(parentGuardiansRes.data.filter((parentGuardian) => parentGuardian.student_id === selectedStudentId));
        setSiblings(siblingsRes.data.filter((sibling) => sibling.student_id === selectedStudentId));
        setEducationFundingHistories(educationFundingHistoriesRes.data.filter((history) => history.student_id === selectedStudentId));
        //setBursaries(bursariesRes.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <select value={selectedStudentId} onChange={(event) => setSelectedStudentId(event.target.value)}>
        <option value="">Select a student</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name} ({student.id})
          </option>
        ))}
      </select>
      <button id="loginbutton"onClick={fetchDataForStudent}>Search</button>
      <h2>Beneficiaries</h2>
      <ul>
        {beneficiaries.map((beneficiary, index) => (
          <li key={index}>
            {`Student ID: ${beneficiary.student_id || 'N/A'}, Bursary ID: ${beneficiary.bursary_id || 'N/A'}, Amount Allocated: ${beneficiary.amount_allocated}, Date Allocated: ${beneficiary.date_allocated}, Disbursed: ${beneficiary.disbursed}, Date Disbursed: ${beneficiary.date_disbursed || 'N/A'}`}
          </li>
        ))}
      </ul>
      <h2>Parent Guardians</h2>
      <ul>
        {parentGuardians.map((parentGuardian, index) => (
          <li key={index}>
            {`Student ID: ${parentGuardian.student_id || 'N/A'}, Parent: ${parentGuardian.parent}, First Name: ${parentGuardian.first_name}, Last Name: ${parentGuardian.last_name}, Status: ${parentGuardian.status}, Occupation: ${parentGuardian.occupation}, Main Income Source: ${parentGuardian.main_income_source}, Other Income Source: ${parentGuardian.other_income_source || 'N/A'}, Employed: ${parentGuardian.employed}`}
          </li>
        ))}
      </ul>
      <h2>Siblings</h2>
      <ul>
        {siblings.map((sibling, index) => (
          <li key={index}>
            {`ID: ${sibling.id || 'N/A'}, Name: ${sibling.name}, Relationship: ${sibling.relationship}, Institution: ${sibling.institution}, Level: ${sibling.level}, Total Annual Fees: ${sibling.total_annual_fees}, Paid: ${sibling.paid}`}
          </li>
        ))}
      </ul>
      <h2>Education Funding Histories</h2>
      <ul>
        {educationFundingHistories.map((history, index) => (
          <li key={index}>
            {`Student ID: ${history.student_id || 'N/A'}, Institution Type: ${history.institution_type}, Institution Name: ${history.institution_name}, Start Date: ${history.start_date}, End Date: ${history.end_date}, Funding Source: ${history.funding_source}, Details: ${history.details}`}
          </li>
        ))}
      </ul>
      {/*<h2>Bursaries</h2>
      <ul>
        {bursaries.map((bursary, index) => (
          <li key={index}>
            {`Title: ${bursary.title}, Description: ${bursary.description}, Fund Amount: ${bursary.fund_amount}, Contact Person: ${bursary.contact_person}, Photo URL: ${bursary.photo_url || 'N/A'}`}
          </li>
        ))}
        </ul>*/}
    </div>
  );
};

export default AdminView;

import axios from 'axios';

const API_URL = 'http://127.0.0.1:5555/';  // Replace with your API's base URL

export const signUp = (userData) => axios.post(`${API_URL}/sign-up`, userData);
//export const addContactDetails = (userId, contactDetails) => axios.post(`${API_URL}/add-contact-details/${userId}`, contactDetails);
//export const addContactDetails = (userId, contactDetails) => axios.post(`${API_URL}/add-contact-details/${userId}`, contactDetails);
export const addFamilyInformation = (studentId, familyInfo) => axios.post(`${API_URL}/add-family-information/${studentId}`, familyInfo);
export const addSiblingInformation = (studentId, siblingInfo) => axios.post(`${API_URL}/add-sibling-information/${studentId}`, siblingInfo);
//export const addInstitutionInformation = (studentId, institutionInfo) => axios.post(`${API_URL}/add-institution-information/${studentId}`, institutionInfo);
export const addPersonalDetails = (userId, personalDetails) => axios.post(`${API_URL}/add-personal-details/${userId}`, personalDetails);

export const addDeclarations = (studentId, declarations) => axios.post(`${API_URL}/add-declarations/${studentId}`, declarations);
export const addEducationFundingHistory = (studentId, fundingHistory) => axios.post(`${API_URL}/add-education-funding-history/${studentId}`, fundingHistory);
//export const receiveBursary = (studentId) => axios.post(`${API_URL}/receive-bursary/${studentId}`);
export const receiveBursary = (studentId) => axios.get(`${API_URL}/receive-bursary/${studentId}`);

//admin
export const verifyStudentInformation = (adminId, studentId) => axios.post(`${API_URL}/verify-student-information/${adminId}/${studentId}`);
export const approveStudentInformation = (adminId, studentId) => axios.post(`${API_URL}/approve-student-information/${adminId}/${studentId}`);
export const awardStudentNeedyScore = (adminId, studentId, score) => axios.post(`${API_URL}/award-student-needy-score/${adminId}/${studentId}`, { score });
export const onboardNewBursarySource = (adminId, sourceDetails) => axios.post(`${API_URL}/onboard-new-bursary-source/${adminId}`, sourceDetails);
export const viewAppliedBursaries = (adminId) => axios.get(`${API_URL}/view-applied-bursaries/${adminId}`);

// New functions for Sponsors
export const createNewBursary = (bursaryDetails) => axios.post(`${API_URL}/add-bursary`, bursaryDetails);

export const viewApplications = (sponsorId) => axios.get(`${API_URL}/view-applications/${sponsorId}`);
export const awardBursaries = (sponsorId, studentId, bursaryDetails) => axios.post(`${API_URL}/award-bursaries/${sponsorId}/${studentId}`, bursaryDetails);
export const viewAllStudents = () => {return axios.get(`${API_URL}/view-students`);};


export const rejectRequest = (sponsorId, requestId) => axios.post(`${API_URL}/reject-request/${sponsorId}/${requestId}`);

//get all students
export const getAllStudents = () => axios.get(`${API_URL}/get-all-students2`);
//get all users
export const getAllUsers = () => axios.get(`${API_URL}/get-all-users`);
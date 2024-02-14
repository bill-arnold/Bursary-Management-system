import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Replace with your API's base URL

export const signUp = (userData) => axios.post(`${API_URL}/sign-up`, userData);
export const addContactDetails = (userId, contactDetails) => axios.post(`${API_URL}/add-contact-details/${userId}`, contactDetails);
export const addFamilyInformation = (studentId, familyInfo) => axios.post(`${API_URL}/add-family-information/${studentId}`, familyInfo);
export const addSiblingInformation = (studentId, siblingInfo) => axios.post(`${API_URL}/add-sibling-information/${studentId}`, siblingInfo);
export const addInstitutionInformation = (studentId, institutionInfo) => axios.post(`${API_URL}/add-institution-information/${studentId}`, institutionInfo);
export const addPersonalDetails = (studentId, personalDetails) => axios.post(`${API_URL}/add-personal-details/${studentId}`, personalDetails);
export const addDeclarations = (studentId, declarations) => axios.post(`${API_URL}/add-declarations/${studentId}`, declarations);
export const addEducationFundingHistory = (studentId, fundingHistory) => axios.post(`${API_URL}/add-education-funding-history/${studentId}`, fundingHistory);
export const receiveBursary = (studentId) => axios.post(`${API_URL}/receive-bursary/${studentId}`);

import axios from 'axios';

const API_URL = 'http://127.0.0.1:5555/';  // Replace with your API's base URL

export const signUp = (userData) => axios.post(`${API_URL}/sign-up`, userData);
//export const addContactDetails = (userId, contactDetails) => axios.post(`${API_URL}/add-contact-details/${userId}`, contactDetails);
//export const addContactDetails = (userId, contactDetails) => axios.post(`${API_URL}/add-contact-details/${userId}`, contactDetails);
export const addFamilyInformation = (studentId, familyInfo) => axios.post(`${API_URL}/add-family-information/${studentId}`, familyInfo);
export const addSiblingInformation = (studentId, siblingInfo) => axios.post(`${API_URL}/add-sibling-information/${studentId}`, siblingInfo);
//export const addInstitutionInformation = (studentId, institutionInfo) => axios.post(`${API_URL}/add-institution-information/${studentId}`, institutionInfo);
export const addStudent = (userId, studentDetails) => axios.post(`${API_URL}/addstudent/${userId}`, studentDetails);

export const addDeclarations = (studentId, declarations) => axios.post(`${API_URL}/add-declarations/${studentId}`, declarations);
export const addEducationFundingHistory = (studentId, fundingHistory) => axios.post(`${API_URL}/add-education-funding-history/${studentId}`, fundingHistory);
//export const receiveBursary = (studentId) => axios.post(`${API_URL}/receive-bursary/${studentId}`);
export const receiveBursary = (studentId) => axios.get(`${API_URL}/receive-bursary/${studentId}`);

//admin


export const verifyStudentInformation = (studentId) => axios.post(`${API_URL}/verify-student/${studentId}`, {});


export const approveStudentInformation = (studentId) => axios.post(`${API_URL}/approve-student/${studentId}`);

export const awardStudentNeedyScore = (studentId, score) => axios.post(`${API_URL}/award-score/${studentId}`, { score });

export const onboardNewBursary = (bursaryDetails) => axios.post(`${API_URL}/onboard-bursary`, bursaryDetails);


// New functions for Sponsors
export const createNewBursary = (bursaryDetails) => axios.post(`${API_URL}/add-bursary`, bursaryDetails);

export const viewApplications = () => axios.get(`${API_URL}/view-applications`);
//export const awardBursary = (applicationId) => axios.post(`${API_URL}/award-bursary/${applicationId}`);

//export const awardBursaries = (sponsorId, studentId, bursaryDetails) => axios.post(`${API_URL}/award-bursaries/${sponsorId}/${studentId}`, bursaryDetails);
export const viewAllStudents = () => {return axios.get(`${API_URL}/view-students`);};


export const awardBursaries = (applicationId) => axios.post(`${API_URL}/award-bursary/${applicationId}`);
export const rejectRequest = (applicationId) => axios.post(`${API_URL}/reject-request/${applicationId}`);


//get all students
export const getAllStudents = () => axios.get(`${API_URL}/get-all-students2`);
//get all users
export const getAllUsers = () => axios.get(`${API_URL}/get-all-users`);
//view applicant id and name
export const ViewApplications = () => axios.get(`${API_URL}/view-applications`)
  .then(response => response.data.map(application => ({
    id: application.id,
    name: application.name
  })));
//login
//export const login = (email, password) => axios.post(`${API_URL}/login`, { email, password });
  // Replace with your API's base URL

// Function for user login
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        const data = response.data;
        // Store access token and refresh token in local storage
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Other API functions for different endpoints
// Add your other API functions here...

export const makeAuthenticatedRequest = async (url, options) => {
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken || isTokenExpired(accessToken)) {
        await refreshToken(); // Refresh access token if expired
        accessToken = localStorage.getItem('accessToken');
    }

    // Include access token in request headers
    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
    };

    // Make the request using Axios
    try {
        const response = await axios(url, options);
        return response.data;
    } catch (error) {
        console.error('Error making authenticated request:', error);
        throw error;
    }
};

// Function to refresh access token
const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    // Send request to backend token refresh endpoint
    try {
        const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
        const data = response.data;
        if (response.status === 200) {
            // Update stored access token
            localStorage.setItem('accessToken', data.access_token);
        } else {
            // Handle refresh token failure
            console.error('Token refresh failed:', data.message);
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
};

// Function to check if access token is expired
const isTokenExpired = (token) => {
    const expiry = token.exp * 1000; // Convert expiry time to milliseconds
    return Date.now() >= expiry;
};

export {
    refreshToken,
    isTokenExpired,
};
//update contact details
export const updateContactDetails = (userId, contactDetails) => {
    return axios.put(`${API_URL}/update_contact/${userId}`, contactDetails);
};
//updatefamilyinformation
export const updateFamilyInformation = (studentId, familyInfo) => {
    return axios.put(`${API_URL}/update_family/${studentId}`, familyInfo);
};
//update sibling information
export const updateSiblingInformation = (studentId, siblingInfo) => {
    return axios.put(`${API_URL}/update-sibling-information/${studentId}`, siblingInfo);
};
//update student information
export const updateStudentInformation = (userId, studentDetails) => {
    return axios.put(`${API_URL}/update_student/${userId}`, studentDetails);
};
//update declarations
export const updateDeclarations = (studentId, declarations) => {
    return axios.put(`${API_URL}/update_declarations/${studentId}`, declarations);
    };
//update education fund history
export const updateEducationFundingHistory = (studentId, fundingHistory) => {
    return axios.put(`${API_URL}/update_education_funding_history/${studentId}`, fundingHistory);
};
//reset password
export const resetPassword = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/reset_password/${email}`, { password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to delete family information
export const deleteFamilyInformation = (studentId) => {
    return axios.delete(`${API_URL}/delete_family/${studentId}`);
};

// Function to delete sibling information
export const deleteSiblingInformation = (studentId) => {
    return axios.delete(`${API_URL}/delete_sibling/${studentId}`);
};

// Function to delete institution information for a student
export const deleteInstitutionInformation = (studentId) => {
    return axios.delete(`${API_URL}/delete_institution/${studentId}`);
};

// Function to delete a student
export const deleteStudent = (studentId) => {
    return axios.delete(`${API_URL}/delete_student/${studentId}`);
};
//deleteDeclaration





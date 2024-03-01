import axios from 'axios';

const API_URL = 'https://bursary-management-system-b63z.onrender.com/';  // Replace with your API's base URL

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






const approveStudentInformation = async (studentId) => {
  try {
    const response = await axios.post(`${API_URL}/approve-student/${studentId}`, { approved: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { approveStudentInformation };

export const awardStudentNeedyScore = (studentId, data) => {
  return axios.post(`${API_URL}/award-score/${studentId}`, data, {
    headers: {
      'Content-Type': 'application/json' // Set content type to JSON
    }
  });
};



export const verifyStudentInformation = async (studentId, columnToUpdate) => {
  try {
    const response = await axios.post(
      `${API_URL}/verify-student/${studentId}`,
      { column_to_update: columnToUpdate }, // Sending the column to update
      {
        headers: {
          'Content-Type': 'application/json' // Set the content type to JSON
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


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
    return axios.put(`${API_URL}/update_sibling/${studentId}`, siblingInfo);
};
//update student information
export const updateStudentInformation = (studentId, studentDetails) => {
    return axios.put(`${API_URL}/update_student/${studentId}`, studentDetails);
};


//update declarations
export const updateDeclarations = (studentId, declarations) => {
    return axios.put(`${API_URL}/update_declaration/${studentId}`, declarations);
};

//update education fund history
export const updateEducationFundingHistory = (studentId, fundingHistory) => {
    return axios.put(`${API_URL}/update-education-funding-history/${studentId}`, fundingHistory);
};


//reset password
export const resetPassword  = (userEmail, newPassword) => {
  return axios.post(
    `${API_URL}/reset_password/${userEmail}`,
    { password: newPassword },
    { headers: { 'Content-Type': 'application/json' } } // Set JSON content type
  );
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
    return axios.delete(`${API_URL}/delete_institution${studentId}`);
};

// Function to delete a student
export const deleteStudent = (studentId) => {
    return axios.delete(`${API_URL}/delete_student/${studentId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


//Logout
export const logout = async () => {
  try {
    // Call the logout API endpoint
    const response = await axios.post('/logout');
    // Check if the logout was successful
    if (response.status === 200) {
      // Clear access token from local storage or perform any other necessary actions
      localStorage.removeItem('accessToken');
      // Redirect to the login page or perform any other necessary actions
      window.location.href = '/login';
    } else {
      // Handle error response if needed
      console.error('Logout failed:', response.data.message);
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Logout failed:', error.message);
  }
};



// Function to delete declaration documents
export const deleteDeclaration = (studentId) => {
    return axios.delete(`${API_URL}/delete-declaration/${studentId}`);
};


//get for admin
export const getAllBeneficiaries = () => axios.get(`${API_URL}/get-all-beneficiaries`);
export const getAllParentGuardians = () => axios.get(`${API_URL}/get-all-parent-guardians`);
export const getAllSiblings = () => axios.get(`${API_URL}/get-all-siblings`);
export const getAllEducationFundingHistories = () => axios.get(`${API_URL}/get-all-education-funding-histories`);
export const getAllBursaries = () => axios.get(`${API_URL}/get-all-bursaries`);

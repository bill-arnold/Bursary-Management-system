import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaUser, FaBriefcase, FaCog, FaSignOutAlt } from 'react-icons/fa';

// Import your existing components...
import SignUp from './SignUp';
import AddFamilyInformation from './AddFamilyInformation';
import AddSiblingInformation from './AddSiblingInformation';
import AddPersonalDetails from './AddPersonalDetails';
import AddDeclarations from './AddDeclarations';
import AddEducationFundingHistory from './AddEducationFundingHistory';
import ReceiveBursary from './ReceiveBursary';
import VerifyStudentInformation from './VerifyStudentInformation';
import ApproveStudentInformation from './ApproveStudentInformation';
import AwardStudentNeedyScore from './AwardStudentNeedyScore';
import OnboardNewBursarySource from './OnboardNewBursarySource';
import ViewAppliedBursaries from './ViewAppliedBursaries';
import AddBursary from './AddBursary';
import AwardBursaries from './AwardBursaries';
import ViewStudents from './ViewStudents';
import RejectRequest from './RejectRequest';
import Login from './Login';
import UpdateFamilyInformation from './UpdateFamilyInformation';
import UpdateSiblingInformation from './UpdateSiblingInformation';
import UpdateStudentInformation from './updatestudentInformation';
import UpdateDeclarations from './updateDeclarations';
import UpdateEducationFundingHistory from './UpdateEducationFundingHistory';
import ResetPassword from './ResetPassword';
import DeleteFamilyInformation from './DeleteFamilyInformation';
import DeleteSiblingInformation from './DeleteSiblingInformation';
import DeleteStudent from './DeleteStudent';
import Logout from './logout';
import DeleteDeclaration from './DeleteDeclarations';
import AdminView from './admin_view';
//import DisplayContent from './DisplayContent';

const Dashboard = () => {
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const role = pathParts[pathParts.length - 1]; // Extract the last part of the path as role

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%', backgroundColor: '#4caf50', height: '245vh', padding: '20px', color: '#fff' }}>
                <h2 style={{ position: 'fixed', top: 0 }}>Dashboard</h2>
                <nav>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {role === 'admin' && (
                            <>
                                <li style={{ position: 'fixed', top: '50px' }}>
                                    <Link to="/dashboard/admin" style={{ textDecoration: 'none', color: '#fff' }}>
                                        <FaCog style={{ marginRight: '10px' }} /> Admin
                                    </Link>
                                </li>
                            </>
                        )}
                        {role === 'applicants' && (
                            <>
                                <li style={{ position: 'fixed', top: '50px' }}>
                                    <Link to="/dashboard/applicants" style={{ textDecoration: 'none', color: '#fff' }}>
                                        <FaUser style={{ marginRight: '10px' }} /> Applicants
                                    </Link>
                                </li>
                            </>
                        )}
                        {role === 'sponsors' && (
                            <>
                                <li style={{ position: 'fixed', top: '50px' }}>
                                    <Link to="/dashboard/sponsors" style={{ textDecoration: 'none', color: '#fff' }}>
                                        <FaBriefcase style={{ marginRight: '10px' }} /> Sponsors
                                    </Link>
                                </li>
                            </>
                        )}
                        <li style={{ position: 'fixed', bottom: '20px' }}>
                            <Link to="/logout" style={{ textDecoration: 'none', color: '#fff' }}>
                                <FaSignOutAlt style={{ marginRight: '10px' }} /> Logout
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div>
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f1f3f1' }} >
                <h1 style={{ marginBottom: '30px', textAlign: 'center', color: 'black' }}>Bursary Management System 🎓</h1>

                <div>
                    <div>


                    </div>
                </div>

                <Routes>
                    <Route path="applicants" element={<ApplicantsRoutes />} />
                    <Route path="sponsors" element={<SponsorsRoutes />} />
                    <Route path="admin" element={<AdminRoutes />} />
                </Routes>
            </div>

        </div>
    );
}

const ApplicantsRoutes = () => {
    return (
        <>
            <h2 style={{ marginBottom: '20px' }}>Add Student Details</h2>
            <AddPersonalDetails />
            <h2 style={{ marginBottom: '20px' }}>View Students</h2>
            <ViewStudents />
            <h2 style={{ marginBottom: '20px' }}>Update Student Details</h2>
            <UpdateStudentInformation />
            <h2 style={{ marginBottom: '20px' }}>Delete Students</h2>
            <DeleteStudent />
            <h2 style={{ marginBottom: '20px' }}>Add Family Information</h2>
            <AddFamilyInformation />
            <h2 style={{ marginBottom: '20px' }}>Update Family Information</h2>
            <UpdateFamilyInformation />
            <h2 style={{ marginBottom: '20px' }}>Delete Family Information</h2>
            <DeleteFamilyInformation />
            <h2 style={{ marginBottom: '20px' }}>Add Sibling Information</h2>
            <AddSiblingInformation />
            <h2 style={{ marginBottom: '20px' }}>update Sibling Information</h2>
            <UpdateSiblingInformation />
            <h2 style={{ marginBottom: '20px' }}>Delete Sibling Information</h2>
            <DeleteSiblingInformation />
            <h2 style={{ marginBottom: '20px' }}>Add Declarations</h2>
            <AddDeclarations />
            <h2 style={{ marginBottom: '20px' }}>Update Declarations</h2>
            <UpdateDeclarations />
            <h2 style={{ marginBottom: '20px' }}>Delete Declaration</h2>
            <DeleteDeclaration />
            <h2 style={{ marginBottom: '20px' }}>Add Education Funding History</h2>
            <AddEducationFundingHistory />
            <h2 style={{ marginBottom: '20px' }}>Update Education Funding History</h2>
            <UpdateEducationFundingHistory />
            <ReceiveBursary />
        </>
    );
}

const SponsorsRoutes = () => {
    return (
        <>
            <h2 style={{ marginBottom: '20px' }}>Add Bursary</h2>
            <AddBursary />
            <h2 style={{ marginBottom: '20px' }}>Applied Bursary</h2>
            <ViewAppliedBursaries />
            <h2 style={{ marginBottom: '20px' }}>View Students</h2>
            <ViewStudents />
            <h2 style={{ marginBottom: '20px' }}>Award Bursary</h2>
            <AwardBursaries />
            <h2 style={{ marginBottom: '20px' }}>Reject Bursary</h2>
            <RejectRequest />
        </>
    );
}

const AdminRoutes = () => {
    return (
        <>
            <h2 style={{ marginBottom: '20px' }}>View Students</h2>
            <ViewStudents />
            <h2 style={{ marginBottom: '20px' }}>View Bursary</h2>
            <ViewAppliedBursaries />
            <h2 style={{ marginBottom: '20px' }}>Verify Student Info</h2>
            <VerifyStudentInformation />
            <h2 style={{ marginBottom: '20px' }}>Approve Student Info</h2>
            <ApproveStudentInformation />
            <h2 style={{ marginBottom: '20px' }}>Award Needy Score </h2>
            <AwardStudentNeedyScore />
            <h2 style={{ marginBottom: '20px' }}>Onboard New Bursary</h2>
            <OnboardNewBursarySource />
            <h2 style={{ marginBottom: '20px' }}>View Applied Bursaries</h2>
            <ViewAppliedBursaries />
            <AdminView />
        </>
    );
}

export default Dashboard;

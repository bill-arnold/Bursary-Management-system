import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

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
import MainContent from './MainContent';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '200px', backgroundColor: 'lightgray', height: '100vh', padding: '20px' }}>
                <h2>Dashboard</h2>
                <nav id="mainNav">
                    <ul id="navList" style={{ listStyle: 'none', padding: 0 }}>
                        <li id="navItem"><Link id="navLink" to="/dashboard/applicants">Applicants</Link></li>
                        <li id="navItem"><Link id="navLink" to="/dashboard/sponsors">Sponsors</Link></li>
                        <li id="navItem"><Link id="navLink" to="/dashboard/admin">Admin</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
                <h1>Bursary Management System</h1>
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
            <h2>Add Student Details</h2>
            <MainContent/>
            <AddPersonalDetails />
            <h2>View Students</h2>
            <ViewStudents />
            <h2>Update Student Details</h2>
            <UpdateStudentInformation />
            <h2>Delete Students</h2>
            <DeleteStudent />
            <h2>Add Family Information</h2>
            <AddFamilyInformation />
            <h2>Update Family Information</h2>
            <UpdateFamilyInformation />
            <h2>Delete Family Information</h2>
            <DeleteFamilyInformation />
            <h2>Add Sibling Information</h2>
            <AddSiblingInformation />
            <h2>update Sibling Information</h2>
            <UpdateSiblingInformation />
            <h2>Delete Sibling Information</h2>
            <DeleteSiblingInformation />
            <h2>Add Declarations</h2>
            <AddDeclarations />
            <h2>Update Declarations</h2>
            <UpdateDeclarations />
            <h2>Delete Declaration</h2>
            <DeleteDeclaration />
            <h2>Add Education Funding History</h2>
            <AddEducationFundingHistory />
            <h2>Update Education Funding History</h2>
            <UpdateEducationFundingHistory />
            <ReceiveBursary />
        </>
    );
}

const SponsorsRoutes = () => {
    return (
        <>
            <h2>Add Bursary</h2>
            <AddBursary />
            <h2>Applied Bursary</h2>
            <ViewAppliedBursaries />
            <h2>View Students</h2>
            <ViewStudents />
            <h2>Award Bursary</h2>
            <AwardBursaries />
            <h2>Reject Bursary</h2>
            <RejectRequest />
        </>
    );
}

const AdminRoutes = () => {
    return (
        <>
            <VerifyStudentInformation />
            <ApproveStudentInformation />
            <AwardStudentNeedyScore />
            <OnboardNewBursarySource />
            <ViewAppliedBursaries />
        </>
    );
}

export default Dashboard;

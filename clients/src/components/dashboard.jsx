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



const Dashboard = () => {
    return (
        <div>
            <h1>Bursary Management System</h1>
            <nav id="mainNav">
                <ul id="navList">
                    <li id="navItem"><Link id="navLink" to="/">Home</Link></li>
                    <li id="navItem"><Link id="navLink" to="/applicants">Applicants</Link></li>
                    <li id="navItem"><Link id="navLink" to="/sponsors">Sponsors</Link></li>
                    <li id="navItem"><Link id="navLink" to="/admin">Admin</Link></li>
                    <li id="navItem"><Link id="navLink" to="/SignUp">Sign Up</Link></li>
                    <li id="navItem"><Link id="navLink" to="/logIn">Login</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/applicants" element={
                    <>
                        <h2>Add Student Details</h2>
                        <AddPersonalDetails />
                        <h2>View Students</h2>
                        <ViewStudents />
                        <h2>Update Student Details</h2>
                        < UpdateStudentInformation/>
                        <h2>Delete Students</h2>
                        <DeleteStudent/>
                        <h2>Add Family Information</h2>
                        <AddFamilyInformation />
                        <h2>Update Family Information</h2>
                        < UpdateFamilyInformation/>
                        <h2>Delete Family Information</h2>
                        <DeleteFamilyInformation />
                        <h2>Add Sibling Information</h2>
                        <AddSiblingInformation />
                        <h2>update Sibling Information</h2>
                        < UpdateSiblingInformation/>
                        <h2>Delete Sibling Information</h2>
                        <DeleteSiblingInformation />
                        <h2>Add Declarations</h2>
                        <AddDeclarations />
                          <h2>Update Declarations</h2>
                        < UpdateDeclarations/>
                        <h2>Add Education Funding History</h2>
                        <AddEducationFundingHistory />
                        <h2>Update Education Funding History</h2>
                        < UpdateEducationFundingHistory />
                        <ReceiveBursary />
                    </>
                } />
                <Route path="/sponsors" element={
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
                } />
                <Route path="/admin" element={
                    <>
                        <VerifyStudentInformation />
                        <ApproveStudentInformation />
                        <AwardStudentNeedyScore />
                        <OnboardNewBursarySource />
                        <ViewAppliedBursaries />
                    </>
                } />
                <Route path="/SignUp" element={
                    <>
                        <h2>Sign Up</h2>
                        <SignUp />
                    </>
                } />
                <Route path="/logIn" element={
                    <>
                        <h2>Login </h2>
                        <Login />
                        < ResetPassword/>
                    </>
                } />
            </Routes>
        </div>
    );
}

export default Dashboard;

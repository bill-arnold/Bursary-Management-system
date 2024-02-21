import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import your existing components...
import SignUp from './components/SignUp';
import AddFamilyInformation from './components/AddFamilyInformation';
import AddSiblingInformation from './components/AddSiblingInformation';
import AddPersonalDetails from './components/AddPersonalDetails';
import AddDeclarations from './components/AddDeclarations';
import AddEducationFundingHistory from './components/AddEducationFundingHistory';
import ReceiveBursary from './components/ReceiveBursary';
import VerifyStudentInformation from './components/VerifyStudentInformation';
import ApproveStudentInformation from './components/ApproveStudentInformation';
import AwardStudentNeedyScore from './components/AwardStudentNeedyScore';
import OnboardNewBursarySource from './components/OnboardNewBursarySource';
import ViewAppliedBursaries from './components/ViewAppliedBursaries';
import AddBursary from './components/AddBursary';
import AwardBursaries from './components/AwardBursaries';
import ViewStudents from './components/ViewStudents';
import RejectRequest from './components/RejectRequest';

const App = () => {
    return (
        <Router>
            <h1>Bursary Management System</h1>
            <div>
                <nav id="mainNav">
                    <ul id="navList">
                        <li id="navItem"><Link id="navLink" to="/">Home</Link></li>
                        <li id="navItem"><Link id="navLink" to="/applicants">Applicants</Link></li>
                        <li id="navItem"><Link id="navLink" to="/sponsors">Sponsors</Link></li>
                        <li id="navItem"><Link id="navLink" to="/admin">Admin</Link></li>
                        <li id="navItem"><Link id="navLink" to="/SignUp">Sign Up</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/applicants" element={
                        <>

                            
                            <AddContactDetails />
                            <SignUp />

                            <h2>Add Personal Details</h2>
                            <AddPersonalDetails />
                            <h2>Add Family Information</h2>

                            <AddFamilyInformation />
                            <h2>Add Sibling Information</h2>
                            <AddSiblingInformation />
                            <h2>Add Declarations</h2>
                            <AddDeclarations />
                            <h2>Add Education Funding History</h2>
                            <AddEducationFundingHistory />
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
                </Routes>
            </div>
        </Router>
    );
}



export default App;

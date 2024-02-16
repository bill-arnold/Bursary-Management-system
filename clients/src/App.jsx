import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';


// Import your existing components...
import SignUp from './components/SignUp';
import AddContactDetails from './components/AddContactDetails';
import AddFamilyInformation from './components/AddFamilyInformation';
import AddSiblingInformation from './components/AddSiblingInformation';
import AddInstitutionInformation from './components/AddInstitutionInformation';
import AddPersonalDetails from './components/AddPersonalDetails';
import AddDeclarations from './components/AddDeclarations';
import AddEducationFundingHistory from './components/AddEducationFundingHistory';
import ReceiveBursary from './components/ReceiveBursary';

// Import your new components...
import VerifyStudentInformation from './components/VerifyStudentInformation';
// import ApproveStudentInformation from './components/ApproveStudentInformation';
import AwardStudentNeedyScore from './components/AwardStudentNeedyScore';
import OnboardNewBursarySource from './components/OnboardNewBursarySource';
import ViewAppliedBursaries from './components/ViewAppliedBursaries';
// import CreateNewBursary from './components/CreateNewBursary';
// import ViewApplications from './components/ViewApplications';
import AwardBursaries from './components/AwardBursaries';
import ViewStudents from './components/ViewStudents';
import RejectRequest from './components/RejectRequest';

const App = () => {
    return (
        <Router>
            <h1>Bursary Management System</h1>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/applicants">Applicants</Link></li>
                        <li><Link to="/sponsors">Sponsors</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/applicants" element={
                        <>
                            <SignUp />
                            <AddContactDetails />
                            <AddFamilyInformation />
                            <AddSiblingInformation />
                            <AddInstitutionInformation />
                            <AddPersonalDetails />
                            <AddDeclarations />
                            <AddEducationFundingHistory />
                            <ReceiveBursary />
                        </>
                    }/>
                    <Route path="/sponsors" element={
                        <>
                            {/* <CreateNewBursary />
                            <ViewApplications /> */}
                            <AwardBursaries />
                            <ViewStudents />
                            <RejectRequest />
                        </>
                    }/>
                    <Route path="/admin" element={
                        <>
                            <VerifyStudentInformation />
                            {/* <ApproveStudentInformation /> */}
                            <AwardStudentNeedyScore />
                            <OnboardNewBursarySource />
                            <ViewAppliedBursaries />
                        </>
                    }/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;

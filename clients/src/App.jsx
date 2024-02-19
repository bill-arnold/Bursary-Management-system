import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';


// Import your existing components...
import SignUp from './components/SignUp';
//import AddContactDetails from './components/AddContactDetails';
import AddFamilyInformation from './components/AddFamilyInformation';
import AddSiblingInformation from './components/AddSiblingInformation';
//import AddInstitutionInformation from './components/AddInstitutionInformation';
import AddPersonalDetails from './components/AddPersonalDetails';
import AddDeclarations from './components/AddDeclarations';
import AddEducationFundingHistory from './components/AddEducationFundingHistory';
import ReceiveBursary from './components/ReceiveBursary';

// Import your new components...
import VerifyStudentInformation from './components/VerifyStudentInformation';
import ApproveStudentInformation from './components/ApproveStudentInformation';
import AwardStudentNeedyScore from './components/AwardStudentNeedyScore';
import OnboardNewBursarySource from './components/OnboardNewBursarySource';
import ViewAppliedBursaries from './components/ViewAppliedBursaries';
import AddBursary from './components/AddBursary';
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
                        <h2>SignUp</h2>
                            <SignUp />
                            {/*<AddContactDetails />*/}
                            <h2>AddFamilyInformation</h2>
                            <AddFamilyInformation />
                            <h2>AddSiblingInformation</h2>
                            <AddSiblingInformation />
                            {/*<h2>AddInstitutionInformation</h2>
                            <AddInstitutionInformation />*/}
                            <h2>AddStudentDetails</h2>
                            <AddPersonalDetails />
                            <h2>AddDeclarations</h2>
                            <AddDeclarations />
                            <h2>AddEducationFundingHistory</h2>
                            <AddEducationFundingHistory />
                            <ReceiveBursary />
                        </>
                    }/>
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
                    }/>
                    <Route path="/admin" element={
                        <>
                            <VerifyStudentInformation />
                            <ApproveStudentInformation /> 
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

// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import AddContactDetails from './components/AddContactDetails';
import AddFamilyInformation from './components/AddFamilyInformation';
import AddSiblingInformation from './components/AddSiblingInformation';
import AddInstitutionInformation from './components/AddInstitutionInformation';
import AddPersonalDetails from './components/AddPersonalDetails';
import AddDeclarations from './components/AddDeclarations';
import AddEducationFundingHistory from './components/AddEducationFundingHistory';
import ReceiveBursary from './components/ReceiveBursary';
import VerifyStudentInformation from './components/VerifyStudentInformation';
import AwardStudentNeedyScore from './components/AwardStudentNeedyScore';
import OnboardNewBursarySource from './components/OnboardNewBursarySource';
import ViewAppliedBursaries from './components/ViewAppliedBursaries';
import AwardBursaries from './components/AwardBursaries';
import ViewStudents from './components/ViewStudents';
import RejectRequest from './components/RejectRequest';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/applicants" element={<SignUp />}>
                    <Route path="add-contact-details" element={<AddContactDetails />} />
                    <Route path="add-family-information" element={<AddFamilyInformation />} />
                    <Route path="add-sibling-information" element={<AddSiblingInformation />} />
                    <Route path="add-institution-information" element={<AddInstitutionInformation />} />
                    <Route path="add-personal-details" element={<AddPersonalDetails />} />
                    <Route path="add-declarations" element={<AddDeclarations />} />
                    <Route path="add-education-funding-history" element={<AddEducationFundingHistory />} />
                    <Route path="receive-bursary" element={<ReceiveBursary />} />
                </Route>
                <Route path="/admin" element={<VerifyStudentInformation />}>
                    <Route path="award-student-needy-score" element={<AwardStudentNeedyScore />} />
                    <Route path="onboard-new-bursary-source" element={<OnboardNewBursarySource />} />
                    <Route path="view-applied-bursaries" element={<ViewAppliedBursaries />} />
                </Route>
                <Route path="/sponsors" element={<AwardBursaries />}>
                    <Route path="view-students" element={<ViewStudents />} />
                    <Route path="reject-request" element={<RejectRequest />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;

// app.jsx
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Import your existing components...
import SignUp from './components/SignUp';
import AddContactDetails from 'src/components/AddContactDetails';
import AddFamilyInformation from 'src/components/AddFamilyInformation';
import AddSiblingInformation from 'src/components/AddSiblingInformation';
import AddInstitutionInformation from 'src/components/AddInstitutionInformation';
import AddPersonalDetails from 'src/components/AddPersonalDetails';
import AddDeclarations from 'src/components/AddDeclarations';
import AddEducationFundingHistory from 'src/components/AddEducationFundingHistory';
import ReceiveBursary from 'src/components/ReceiveBursary';

// Import your new components...
import VerifyStudentInformation from 'src/components/VerifyStudentInformation';
import ApproveStudentInformation from 'src/components/ApproveStudentInformation';
import AwardStudentNeedyScore from 'src/components/AwardStudentNeedyScore';
import OnboardNewBursarySource from 'src/components/OnboardNewBursarySource';
import ViewAppliedBursaries from 'src/components/ViewAppliedBursaries';
import CreateNewBursary from 'src/components/CreateNewBursary';
import ViewApplications from 'src/components/ViewApplications';
import AwardBursaries from 'src/components/AwardBursaries';
import ViewStudents from 'src/components/ViewStudents';
import RejectRequest from 'src/components/RejectRequest';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/applicants">Applicants</Link></li>
                        <li><Link to="/sponsors">Sponsors</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/applicants">
                        <SignUp />
                        <AddContactDetails />
                        <AddFamilyInformation />
                        <AddSiblingInformation />
                        <AddInstitutionInformation />
                        <AddPersonalDetails />
                        <AddDeclarations />
                        <AddEducationFundingHistory />
                        <ReceiveBursary />
                    </Route>
                    <Route path="/sponsors">
                        <CreateNewBursary />
                        <ViewApplications />
                        <AwardBursaries />
                        <ViewStudents />
                        <RejectRequest />
                    </Route>
                    <Route path="/admin">
                        <VerifyStudentInformation />
                        <ApproveStudentInformation />
                        <AwardStudentNeedyScore />
                        <OnboardNewBursarySource />
                        <ViewAppliedBursaries />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

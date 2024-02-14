import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import AddContactDetails from './AddContactDetails';
import AddFamilyInformation from './AddFamilyInformation';
import AddSiblingInformation from './AddSiblingInformation';
import AddInstitutionInformation from './AddInstitutionInformation';
import AddPersonalDetails from './AddPersonalDetails';
import AddDeclarations from './AddDeclarations';
import AddEducationFundingHistory from './AddEducationFundingHistory';
import ReceiveBursary from './ReceiveBursary';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/sign-up">Sign Up</Link></li>
                        <li><Link to="/add-contact-details">Add Contact Details</Link></li>
                        <li><Link to="/add-family-information">Add Family Information</Link></li>
                        <li><Link to="/add-sibling-information">Add Sibling Information</Link></li>
                        <li><Link to="/add-institution-information">Add Institution Information</Link></li>
                        <li><Link to="/add-personal-details">Add Personal Details</Link></li>
                        <li><Link to="/add-declarations">Add Declarations</Link></li>
                        <li><Link to="/add-education-funding-history">Add Education Funding History</Link></li>
                        <li><Link to="/receive-bursary">Receive Bursary</Link></li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/sign-up"><SignUp /></Route>
                    <Route path="/add-contact-details"><AddContactDetails /></Route>
                    <Route path="/add-family-information"><AddFamilyInformation /></Route>
                    <Route path="/add-sibling-information"><AddSiblingInformation /></Route>
                    <Route path="/add-institution-information"><AddInstitutionInformation /></Route>
                    <Route path="/add-personal-details"><AddPersonalDetails /></Route>
                    <Route path="/add-declarations"><AddDeclarations /></Route>
                    <Route path="/add-education-funding-history"><AddEducationFundingHistory /></Route>
                    <Route path="/receive-bursary"><ReceiveBursary /></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

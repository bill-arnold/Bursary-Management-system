import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import {Home, PeopleAlt, SupervisorAccount,ExitToApp,AddBox,Assignment,Person,LibraryBooks, AttachMoney, VerifiedUser, HowToReg, PlaylistAddCheck, AssignmentTurnedIn, PlaylistAdd, HighlightOff,
  } from '@mui/icons-material';

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

const drawerWidth = 240;

const useStyles = styled((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <List>
          <ListItem component={Link} to="/dashboard" button>
            <Home className={classes.icon} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/dashboard/applicants" button>
            <PeopleAlt className={classes.icon} />
            <ListItemText primary="Applicants" />
          </ListItem>
          <ListItem component={Link} to="/dashboard/sponsors" button>
            <SupervisorAccount className={classes.icon} />
            <ListItemText primary="Sponsors" />
          </ListItem>
          <ListItem component={Link} to="/dashboard/admin" button>
            <SupervisorAccount className={classes.icon} />
            <ListItemText primary="Admin" />
          </ListItem>
          <ListItem component={Link} to="/logout" button>
            <ExitToApp className={classes.icon} />
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
            <Container sx={{ flexGrow: 1, p: 0, m: 20 }}>
                <h1>Bursary Management System</h1>
                <Routes>
                    <Route path="applicants" element={<ApplicantsRoutes />} />
                    <Route path="sponsors" element={<SponsorsRoutes />} />
                    <Route path="admin" element={<AdminRoutes />} />
                </Routes>
            </Container>
        </div>
    );
}

const ApplicantsRoutes = () => {
    return (
        <>
            <h2>Add Student Details</h2>
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

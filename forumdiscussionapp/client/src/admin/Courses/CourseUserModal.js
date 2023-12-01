import * as React from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Slide,
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CourseUserModal({ onClose, selectedCourseId, open }) {
  const [selectedUsersToAdd, setSelectedUsersToAdd] = React.useState([]);
  const [enrolledUsers, setEnrolledUsers] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [removeConfirmation, setRemoveConfirmation] = React.useState({ open: false, user: null });

  React.useEffect(() => {
    if (open) {
      fetchCourseEnrollments();
      fetchAllUsers();
    }
  }, [open, selectedCourseId]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users/users/get');
      if (response.data && Array.isArray(response.data.users)) {
        const filteredUsers = response.data.users;
        setAllUsers(filteredUsers);
      } else {
        console.error('Invalid response data format (Users):', response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCourseEnrollments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/courses/courses/enrollments/${selectedCourseId}`
      );
      if (response.status === 404) {
        console.error('No enrollments found for the course:', response.data.error);
        setEnrolledUsers([]);
        return;
      }

      if (response.data && typeof response.data.enrollments === 'object') {
        const enrollmentsData = response.data.enrollments;
        const enrolledUsersArray = Object.values(enrollmentsData).flatMap((enrollments) =>
          enrollments.map((user) => ({ UserID: user.UserID, UserName: user.UserName }))
        );

        setEnrolledUsers(enrolledUsersArray);
      } else {
        console.error('Invalid response data format for course enrollments:', response.data);
      }
    } catch (error) {
      console.error('Error fetching course enrollments:', error);
    }
  };

  const handleAddUserToCourse = async () => {
    try {
      if (!selectedUsersToAdd || selectedUsersToAdd.length === 0 || !selectedUsersToAdd[0]?.userId) {
        console.error('Invalid user selected');
        return;
      }

      const userId = selectedUsersToAdd[0].UserID;

      const response = await axios.post(
        `http://localhost:8081/courses/courses/${selectedCourseId}/enroll`,
        {
          courseId: selectedCourseId,
          userId: userId,
        }
      );

      console.log('Enroll Users Response:', response.data);
      fetchCourseEnrollments();
    } catch (error) {
      console.error('Error enrolling users to course:', error);
    }
  };

  const handleRemoveUserConfirmation = (user) => {
    setRemoveConfirmation({ open: true, user });
  };

  const confirmRemoveUser = async () => {
    try {
      if (!removeConfirmation.user || !removeConfirmation.user.userId) {
        console.error('Invalid user selected for removal');
        return;
      }

      const userId = removeConfirmation.user.userId;

      const response = await axios.patch(
        `http://localhost:8081/courses/courses/${selectedCourseId}/enrollments/${userId}`
      );

      console.log('Delete User Response:', response.data);
      fetchCourseEnrollments();
    } catch (error) {
      console.error('Error removing user from course:', error);
    } finally {
      setRemoveConfirmation({ open: false, user: null });
    }
  };

  const cancelRemoveUser = () => {
    setRemoveConfirmation({ open: false, user: null });
  };

  const DropdownIndicator = ({ isOpen }) => (
    <div style={{ display: 'flex', alignItems: 'center', paddingRight: '8px' }}>
      <ArrowDropDownIcon color={isOpen ? 'primary' : 'action'} />
    </div>
  );

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <DialogTitle id="user-modal-title">Users in Course</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List>
              {enrolledUsers.map((user) => (
                <ListItem key={user.UserID}>
                  <ListItemText primary={user.UserName} />
                  <Button onClick={() => handleRemoveUserConfirmation(user)}>
                    <CloseIcon />
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={allUsers || []}
              getOptionLabel={(option) => (option?.UserName) || ''}
              isOptionEqualToValue={(option, value) => option?.UserID === value?.UserID}
              onChange={(event, value) => setSelectedUsersToAdd(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Users"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              )}
              value={selectedUsersToAdd}
              multiple
              renderOption={(props, option) => (
                <li {...props}>
                  <div>{option?.UserName}</div>
                </li>
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" size="small">
          <CloseIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUserToCourse}
          size="small"
        >
          Enroll Users
        </Button>
      </DialogActions>

      <Dialog
        open={removeConfirmation.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={cancelRemoveUser}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Confirm Removal</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to remove this user from the course?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelRemoveUser} color="primary" size="small">
            Cancel
          </Button>
          <Button onClick={confirmRemoveUser} color="secondary" size="small">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}

export default CourseUserModal;
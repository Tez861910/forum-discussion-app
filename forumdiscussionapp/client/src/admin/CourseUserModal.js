import React, { useState, useEffect, useRef } from 'react';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CourseUserModal({ onClose, selectedCourseId, open }) {
  const [selectedUsersToAdd, setSelectedUsersToAdd] = useState([]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const fetchTimeoutRef = useRef(null);

  useEffect(() => {
    fetchCourseEnrollments();
    fetchAllUsers();
  }, [selectedCourseId]);

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
      if (!selectedUsersToAdd || selectedUsersToAdd.length === 0 || !selectedUsersToAdd[0].UserID) {
        console.error('Invalid user selected');
        return;
      }

      const response = await axios.post(
        `http://localhost:8081/courses/courses/${selectedCourseId}/enroll`,
        {
          courseId: selectedCourseId,
          userName: selectedUsersToAdd[0].UserName,
        }
      );

      console.log('Enroll Users Response:', response.data);
      fetchCourseEnrollments();
    } catch (error) {
      console.error('Error enrolling users to course:', error);
    }
  };

  const handleRemoveUserFromList = async () => {
    try {
      console.log('selectedUsersToAdd:', selectedUsersToAdd);
  
      if (!selectedUsersToAdd || selectedUsersToAdd.length === 0 || !selectedUsersToAdd[0]?.UserID) {
        console.error('Invalid user selected');
        return;
      }
  
      const userId = selectedUsersToAdd[0].UserID;
  
      const response = await axios.delete(
        `http://localhost:8081/courses/courses/${selectedCourseId}/enroll/${userId}`
      );
  
      console.log('Delete User Response:', response.data);
      fetchCourseEnrollments();
    } catch (error) {
      console.error('Error removing user from course:', error);
    }
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
                  <Button onClick={() => handleRemoveUserFromList(user)}>
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
    </Dialog>
  );
}

export default CourseUserModal;

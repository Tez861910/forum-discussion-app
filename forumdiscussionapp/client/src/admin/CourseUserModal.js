import React, { useState, useEffect } from 'react';
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
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UsersModal({ onClose, selectedCourseId, open }) {
  const [selectedUsersToAdd, setSelectedUsersToAdd] = useState([]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllUsers();
    fetchCourseEnrollments();
  }, [selectedCourseId]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users/users/get');
      if (Array.isArray(response.data.users)) {
        const users = response.data.users;
        setAllUsers(users);
        console.log('Fetched Users:', users);
      } else {
        console.error('Invalid response data format (Users):', response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCourseEnrollments = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/courses/courses/enrollments/${selectedCourseId}`);
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
      const response = await axios.post(`http://localhost:8081/courses/courses/${selectedCourseId}/enroll`, {
        users: selectedUsersToAdd.map((user) => user.UserID),
      });
      console.log('Enroll Users Response:', response.data);
      fetchCourseEnrollments();
    } catch (error) {
      console.error('Error enrolling users to course:', error);
    }
  };

  const handleRemoveUserFromList = (user) => {
    const updatedUsers = selectedUsersToAdd.filter((u) => u.UserID !== user.UserID);
    setSelectedUsersToAdd(updatedUsers);
  };

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
  options={allUsers}
  getOptionLabel={(option) => option.UserName}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Search Users"
      variant="outlined"
      fullWidth
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      size="small"
    />
  )}
  value={selectedUsersToAdd}
  onChange={(event, value) => setSelectedUsersToAdd(value)}
/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" size="small">
          <CloseIcon />
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddUserToCourse} size="small">
          Enroll Users
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UsersModal;

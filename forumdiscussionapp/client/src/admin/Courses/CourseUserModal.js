import * as React from 'react';
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
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useApi from '../../home-page/Api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CourseUserModal({ onClose, selectedCourseId, open }) {
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [enrolledUsers, setEnrolledUsers] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [removeConfirmation, setRemoveConfirmation] = React.useState({ open: false, user: null });

  const { api } = useApi();

  React.useEffect(() => {
    if (open) {
      fetchCourseEnrollments();
      fetchAllUsers();
    }
  }, [api, open, selectedCourseId]);

  const fetchAllUsers = React.useCallback(async () => {
    try {
      const response = await api.get('/users/users/get');
      if (response.data && Array.isArray(response.data.users)) {
        const filteredUsers = response.data.users;
        setAllUsers(filteredUsers);
      } else {
        console.error('Invalid response data format (Users):', response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [api]);

  const fetchCourseEnrollments = React.useCallback(async () => {
    try {
      const response = await api.get(`/courses/courses/enrollments/${selectedCourseId}`);
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
  }, [api, selectedCourseId]);

  const handleAddUserToCourse = React.useCallback(async () => {
    try {
      const response = await api.post(
        `/courses/courses/${selectedCourseId}/enroll`,
        {
          courseId: selectedCourseId,
          userId: selectedUserId,
        }
      );
  
      console.log('Enroll Users Response:', response.data);
      fetchCourseEnrollments();
    } catch (error) {
      console.error('Error enrolling users to course:', error);
    }
  }, [api, fetchCourseEnrollments, selectedCourseId, selectedUserId]);
  
  
  const handleRemoveUserConfirmation = (user) => {
    setRemoveConfirmation({ open: true, user });
  };

  const confirmRemoveUser = React.useCallback(async () => {
    try {
      if (!removeConfirmation.user || !removeConfirmation.user.UserId) {
        console.error('Invalid user selected for removal');
        return;
      }

      const userId = removeConfirmation.user.UserId;

      const response = await api.patch(
        `/courses/courses/${selectedCourseId}/enrollments/${userId}`
      );

      console.log('Delete User Response:', response.data);
      fetchCourseEnrollments();
    } catch (error) {
      console.error('Error removing user from course:', error);
    } finally {
      setRemoveConfirmation({ open: false, user: null });
    }
  }, [api, fetchCourseEnrollments, removeConfirmation, selectedCourseId]);

  const cancelRemoveUser = () => {
    setRemoveConfirmation({ open: false, user: null });
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
              getOptionLabel={(option) => option?.UserName || ''}
              isOptionEqualToValue={(option, value) => option?.UserID === value}
              onChange={(event, value) => setSelectedUserId(value?.UserID || null)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Users"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              )}
              value={allUsers.find(user => user.UserID === selectedUserId) || null}
              multiple
              renderOption={(props, option) => (
                <li {...props}>
                  <Box>{option?.UserName}</Box>
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
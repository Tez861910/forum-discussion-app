import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Slide, Autocomplete, List, ListItem, ListItemText, Grid, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useApi from '../../home-page/Api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CourseUserModal({ onClose, selectedCourseId, open }) {
  const [selectedUserIds, setSelectedUserIds] = React.useState([]);
  const [enrolledUsers, setEnrolledUsers] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [removeConfirmation, setRemoveConfirmation] = React.useState({ open: false, user: null });
  const [noEnrollmentsFound, setNoEnrollmentsFound] = React.useState(false);

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
        setAllUsers(response.data.users);
      } else {
        console.error('Invalid response data format (Users):', response.data);
        setAllUsers([]);
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
        setNoEnrollmentsFound(false);
      } else {
        console.error('Invalid response data format for course enrollments:', response.data);
        setEnrolledUsers([]);
        setNoEnrollmentsFound(true);
      }
    } catch (error) {
      console.error('Error fetching course enrollments:', error);
    }
  }, [api, selectedCourseId]);

  const handleAddUserToCourse = React.useCallback(async () => {
    try {
      console.log('Before API request - selectedUserIds:', selectedUserIds);

      if (selectedUserIds.length === 0) {
        console.error('No users selected. Cannot enroll.');
        return;
      }

      console.log('Enrolling users with IDs:', selectedUserIds);
  
      const response = await api.post(
        `/courses/courses/${selectedCourseId}/enroll`,
        {
          courseId: selectedCourseId,
          userIds: selectedUserIds,
        }
      );
  
      console.log('Enroll Users Response:', response.data);
      fetchCourseEnrollments();
      setSelectedUserIds([]);
    } catch (error) {
      console.error('Error enrolling users to course:', error);
    }
  }, [api, fetchCourseEnrollments, selectedCourseId, selectedUserIds]);  

  const handleRemoveUserConfirmation = (user) => {
      setRemoveConfirmation({ open: true, user });
  };
    
  const confirmRemoveUser = React.useCallback(async () => {
    try {
      console.log('Removing user:', removeConfirmation.user);
  
      if (!removeConfirmation.user || !removeConfirmation.user.UserID) {
        console.error('Invalid user selected for removal', removeConfirmation.user);
        return;
      }
  
      const userId = removeConfirmation.user.UserID;
  
      console.log('Before API request - userId:', userId);
  
      const response = await api.patch(
        `/courses/courses/${selectedCourseId}/enrollments/${userId}`
      );
  
      console.log('API response:', response);
  
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
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 3,
        },
      }}
    >
      <DialogTitle id="user-modal-title" sx={{ textAlign: 'center', mb: 3 }}>Users in Course</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {enrolledUsers && enrolledUsers.length > 0 ? (
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
            ) : (
              <Typography>No users enrolled in this course.</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {allUsers && (
              <Autocomplete
              options={allUsers ?? []}
              getOptionLabel={(option) => option?.UserName || ''}
              isOptionEqualToValue={(option, value) => option?.UserID === value?.UserID}
              onChange={(event, value) => {
                console.log('Autocomplete onChange - event:', event);
                console.log('Autocomplete onChange - value:', value);
                setSelectedUserIds(value.map((user) => user.UserID));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Users"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              )}
              value={allUsers.filter((user) => selectedUserIds.includes(user.UserID))}
              multiple
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Box>
                    {option?.UserName}
                    {selected && (
                      <Button onClick={(e) => {
                        e.stopPropagation(); 
                        handleRemoveUserConfirmation(option);
                      }}>
                        <CloseIcon />
                      </Button>
                    )}
                  </Box>
                </li>
              )}
            />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', mt: 3 }}>
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
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 3,
          },
        }}
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

import React, { useState, useEffect, useCallback } from 'react';
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
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useApi from '../../home-page/Api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RoleUserModal({ open, onClose, selectedRoleId }) {
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [removeConfirmation, setRemoveConfirmation] = useState({ open: false, user: null });
  const [noEnrollmentsFound, setNoEnrollmentsFound] = useState(false);

  const { api } = useApi();

  useEffect(() => {
    if (open) {
      fetchRoleUsers();
      fetchAllUsers();
    }
  }, [api, open, selectedRoleId]);

  const fetchAllUsers = useCallback(async () => {
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

  const fetchRoleUsers = useCallback(async () => {
    try {
      const response = await api.get(`/roles/roles/enrollments/${selectedRoleId}`);
      
      if (response.status === 404) {
        console.error('No enrollments found for the role:', response.data.error);
        setEnrolledUsers([]);
        return;
      }

      if (response.data && typeof response.data.enrollments === 'object') {
        const enrollmentsData = response.data.enrollments;
        const roleUsersData = Object.values(enrollmentsData).flatMap((enrollments) =>
          enrollments.map((user) => ({ UserID: user.UserID, UserName: user.UserName }))
        );
        setEnrolledUsers(roleUsersData);
        setNoEnrollmentsFound(false);
      } else {
        console.error('Invalid response data format (Role Users):', response.data);
        setEnrolledUsers([]);
        setNoEnrollmentsFound(true);
      }
    } catch (error) {
      console.error('Error fetching role users:', error);
    }
  }, [api, selectedRoleId]);

  const handleAddUserToRole = useCallback(async () => {
    try {

      console.log('Before API request - selectedUserIds:', selectedUserIds);

      if (selectedUserIds.length === 0) {
        console.error('No users selected. Cannot enroll.');
        return;
      }

      console.log('Enrolling users with IDs:', selectedUserIds);

      const response = await api.post(`/roles/roles/${selectedRoleId}/enroll`, {
        roleId: selectedRoleId,
        userIds: selectedUserIds,
      });

      console.log('Add User Response:', response.data);
      fetchRoleUsers();
      setEnrolledUsers([]);
    } catch (error) {
      console.error('Error adding user to role:', error);
    }
  }, [api, fetchRoleUsers, selectedRoleId, selectedUserIds]);

  const handleRemoveUserConfirmation = (user) => {
    setRemoveConfirmation({ open: true, user });
  };

  const confirmRemoveUser = useCallback(async () => {
    try {
      if (!removeConfirmation.user || !removeConfirmation.user.UserID) {
        console.error('Invalid user selected for removal');
        return;
      }

      const userId = removeConfirmation.user.UserID;

      const response = await api.delete(`/roles/roles/${selectedRoleId}/enrollments/${userId}`);
      console.log('Delete User Response:', response.data);
      fetchRoleUsers();
    } catch (error) {
      console.error('Error removing user from role:', error);
    } finally {
      setRemoveConfirmation({ open: false, user: null });
    }
  }, [api, fetchRoleUsers, removeConfirmation, selectedRoleId]);

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
      <DialogTitle id="user-modal-title">Users in Role</DialogTitle>
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
              <Typography>No users enrolled in this role.</Typography>
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
                  setSelectedUserIds(value.map(user => user.UserID));
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
                  <li key={option.UserID} {...props}>
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
      <DialogActions>
        <Button onClick={onClose} color="primary" size="small">
          <CloseIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUserToRole}
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
            Are you sure you want to remove this user from the role?
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

export default RoleUserModal;

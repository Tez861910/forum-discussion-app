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
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useApi from '../../home-page/Api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RoleUserModal({ open, onClose, selectedRoleId }) {
  const [selectedUserIds, setSelectedUserIds] = React.useState([]);
  const [enrolledUsers, setEnrolledUsers] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [removeConfirmation, setRemoveConfirmation] = React.useState({ open: false, user: null });
  const [noEnrollmentsFound, setNoEnrollmentsFound] = React.useState(false);

  const { api } = useApi();

  React.useEffect(() => {
    if (open) {
      fetchRoleUsers();
      fetchAllUsers();
    }
  }, [api, open, selectedRoleId]);

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

  const fetchRoleUsers = React.useCallback(async () => {
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

  const handleAddUserToRole = React.useCallback(async () => {
    try {
      if (selectedUserIds.length === 0) {
        console.error('No users selected. Cannot enroll.');
        return;
      }

      const response = await api.post(`/roles/roles/${selectedRoleId}/enroll`, {
        roleId: selectedRoleId,
        userIds: selectedUserIds,
      });

      if (response.data && response.data.message === 'Role created successfully') {
        setSelectedUserIds([]);
        fetchRoleUsers();
      } else {
        console.error('Error creating role:', response.data);
      }
    } catch (error) {
      console.error('Error creating role:', error);
    }
  }, [api, fetchRoleUsers, selectedRoleId, selectedUserIds]);

  const handleRemoveUserConfirmation = (user) => {
    setRemoveConfirmation({ open: true, user });
  };

  const confirmRemoveUser = React.useCallback(async () => {
    try {
      if (!removeConfirmation.user || !removeConfirmation.user.UserID) {
        console.error('Invalid user selected for removal');
        return;
      }

      const userId = removeConfirmation.user.UserID;

      const response = await api.delete(`/roles/roles/${selectedRoleId}/enrollments/${userId}`);
      if (response.data.message === 'Role soft-deleted successfully') {
        fetchRoleUsers();
      } else {
        console.error('Role soft-deletion failed');
      }
    } catch (error) {
      console.error('Error soft-deleting role:', error);
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
      aria-labelledby="role-modal-title"
      aria-describedby="role-modal-description"
      PaperProps={{
        sx: {
          borderRadius: 16,
          p: 4,
          minWidth: 400,
        },
      }}
    >
      <DialogTitle id="role-modal-title" sx={{ textAlign: 'center', mb: 3 }}>
        Users in Role
      </DialogTitle>
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
      <DialogActions sx={{ justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={onClose} size="small">
          Close
        </Button>
        <Button variant="contained" color="secondary" onClick={handleAddUserToRole} size="small">
          Enroll Users
        </Button>
        {selectedUserIds.length > 0 && (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleRemoveUserConfirmation}
          >
            Remove Selected
          </Button>
        )}
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
            borderRadius: 16,
            p: 4,
            minWidth: 300,
          },
        }}
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

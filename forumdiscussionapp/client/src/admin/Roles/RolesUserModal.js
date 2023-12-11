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
  ListItemSecondaryAction,
  Checkbox,
  Typography,
  Box,
  IconButton,
  Divider,
  styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useApi from '../../home-page/Api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledAutocomplete = styled(Autocomplete)({
  marginBottom: 2,
});

const StyledList = styled(List)({
  maxHeight: 300,
  overflow: 'auto',
});

const StyledButton = styled(Button)({
  marginLeft: 2,
});

function RoleUserModal({ open, onClose, selectedRoleId }) {
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [removeConfirmation, setRemoveConfirmation] = useState({ open: false, user: null });
  const [noEnrollmentsFound, setNoEnrollmentsFound] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedEnrolledUserIds, setSelectedEnrolledUserIds] = useState([]);
  const [selectedAutocompleteUserIds, setSelectedAutocompleteUserIds] = useState([]);
  const [autocompleteValue, setAutocompleteValue] = useState([]);
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
      if (selectedAutocompleteUserIds.length === 0) {
        console.error('No users selected. Cannot enroll.');
        return;
      }

      const response = await api.post(`/roles/roles/${selectedRoleId}/enroll`, {
        roleId: selectedRoleId,
        userIds: selectedAutocompleteUserIds,
      });

      if (response.data && response.data.message === 'Role created successfully') {
        setSelectedAutocompleteUserIds([]);
        setAutocompleteValue([]);
        fetchRoleUsers();
      } else {
        console.error('Error creating role:', response.data);
      }
    } catch (error) {
      console.error('Error creating role:', error);
    }
  }, [api, fetchRoleUsers, selectedRoleId, selectedAutocompleteUserIds]);

  const handleRemoveSelected = useCallback(async () => {
    if (selectedEnrolledUserIds.length === 0) {
      console.error('No users selected for removal.');
      return;
    }
    try {
      const response = await api.patch(`/roles/roles/${selectedRoleId}/enrollments`, {
        userIds: selectedEnrolledUserIds,
      });
      console.log('API response:', response);
      fetchRoleUsers();
    } catch (error) {
      console.error('Error removing users from role:', error);
    } finally {
      setSelectedEnrolledUserIds([]);
    }
  }, [api, fetchRoleUsers, selectedRoleId, selectedEnrolledUserIds]);

  const handleRemoveUserConfirmation = (user) => {
    setRemoveConfirmation({ open: true, user });
  };

  const confirmRemoveUser = useCallback(async () => {
    try {
      if (!removeConfirmation.user || !removeConfirmation.user.UserID) {
        console.error('Invalid user selected for removal', removeConfirmation.user);
        return;
      }
      const userId = removeConfirmation.user.UserID;
      const response = await api.patch(`/roles/roles/${selectedRoleId}/enrollments/${userId}`);
      console.log('API response:', response);
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

  const handleUserCheckboxChange = (userId) => {
    setSelectedEnrolledUserIds((prevSelectedUserIds) => {
      if (prevSelectedUserIds.includes(userId)) {
        // User is already selected, so remove them
        return prevSelectedUserIds.filter((id) => id !== userId);
      } else {
        // User is not selected, so add them
        return [...prevSelectedUserIds, userId];
      }
    });
  };

  const filteredEnrolledUsers = enrolledUsers.filter(
    (user) => user.UserName.toLowerCase().includes(searchText.toLowerCase())
  );

  const nonEnrolledUsers = allUsers.filter(
    (user) => !enrolledUsers.some((enrolledUser) => enrolledUser.UserID === user.UserID)
  );

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
        {/* Search bar for enrolled user list */}
        <TextField
          label="Search Enrolled Users"
          variant="outlined"
          fullWidth
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ mb: 2 }}
        />
        {/* Enrolled Users List */}
        <StyledList>
          {filteredEnrolledUsers.length > 0 ? (
            filteredEnrolledUsers.map((user) => (
              <React.Fragment key={user.UserID}>
                <ListItem button>
                  <Checkbox
                    edge="start"
                    checked={selectedEnrolledUserIds.includes(user.UserID)}
                    tabIndex={-1}
                    disableRipple
                    onChange={() => handleUserCheckboxChange(user.UserID)}
                  />
                  <ListItemText primary={user.UserName} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      size="small"
                      onClick={() => handleRemoveUserConfirmation(user)}
                      sx={{ color: 'secondary.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography>No matching users found.</Typography>
          )}
        </StyledList>
      </DialogContent>
      {/* Add Users Autocomplete */}
      <DialogContent>
        <StyledAutocomplete
          options={nonEnrolledUsers ?? []}
          getOptionLabel={(option) => option?.UserName || ''}
          isOptionEqualToValue={(option, value) => option?.UserID === value?.UserID}
          onChange={(event, value) => {
            setAutocompleteValue(value);
            setSelectedAutocompleteUserIds(value.map((user) => user.UserID));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Add Users" variant="outlined" fullWidth size="small" />
          )}
          value={autocompleteValue}
          multiple
          renderOption={(props, option) => (
            <ListItem {...props}>
              <Box>{option?.UserName}</Box>
            </ListItem>
          )}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={onClose} size="small">
          Close
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddUserToRole}
          size="small"
        >
          Enroll Users
        </Button>
        {selectedEnrolledUserIds.length > 0 && (
          <StyledButton
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleRemoveSelected}
          >
            Remove Selected
          </StyledButton>
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

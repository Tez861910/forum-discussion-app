import * as React from 'react';
import {
  TextField,
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import GroupIcon from '@mui/icons-material/Group';

function RoleListItem({ role, handleEditRole, handleDeleteRole, handleRoleUserModal }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [updatedRoleName, setUpdatedRoleName] = React.useState(role.roleName);

  const handleSaveEdit = () => {
    React.startTransition(() => {
      handleEditRole(role.roleId, updatedRoleName);
      setIsEditing(false);
    });
  };

  return (
    <ListItem key={role.roleId} divider>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={isEditing ? 6 : 8}>
          {isEditing ? (
            <TextField
              type="text"
              value={updatedRoleName}
              onChange={(e) => setUpdatedRoleName(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          ) : (
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ cursor: 'pointer', color: 'primary.main' }}>
                  {role.roleName}
                </Typography>
              }
              onClick={() => handleRoleUserModal(role.roleId)}
            />
          )}
        </Grid>
        <Grid item xs={isEditing ? 6 : 4}>
          {isEditing ? (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveEdit}
                size="small"
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={() => setIsEditing(false)}
                size="small"
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                color="primary"
                onClick={() => setIsEditing(true)}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                color="secondary"
                onClick={() => handleDeleteRole(role.roleId)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="users"
                onClick={() => handleRoleUserModal(role.roleId)}
                size="small"
              >
                <GroupIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default RoleListItem;

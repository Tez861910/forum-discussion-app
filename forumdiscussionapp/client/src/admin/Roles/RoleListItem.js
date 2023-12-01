import React, { useState } from 'react';
import {
  TextField,
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function RoleListItem({ role, handleEditRole, handleDeleteRole, handleRoleUserModal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRoleName, setUpdatedRoleName] = useState(role.roleName);

  const handleSaveEdit = () => {
    // Perform validation if needed
    handleEditRole(role.roleId, updatedRoleName);
    setIsEditing(false);
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
              primary={role.roleName}
              onClick={() => handleRoleUserModal(role.roleId)}
              sx={{ cursor: 'pointer', color: 'primary.main' }}
            />
          )}
        </Grid>
        <Grid item xs={isEditing ? 6 : 4}>
          {isEditing ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveEdit}
                size="small"
                style={{ marginRight: 8 }}
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
            </div>
          ) : (
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  setIsEditing(true);
                }}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
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
                {/* Add appropriate icon for managing users in the role */}
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default RoleListItem;

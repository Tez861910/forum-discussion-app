import * as React from 'react';
import {
  List,
  ListItem,
  Typography,
} from '@mui/material';
import RoleListItem from './RoleListItem';

function RoleList({ roles, handleEditRole, handleDeleteRole, handleRoleUserModal }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {roles.length > 0 ? (
        roles.map((role) => (
          <RoleListItem
            key={role.roleId}
            role={role}
            handleEditRole={handleEditRole}
            handleDeleteRole={handleDeleteRole}
            handleRoleUserModal={handleRoleUserModal}
          />
        ))
      ) : (
        <ListItem>
          <Typography variant="h6" color="text.secondary">
            No roles available
          </Typography>
        </ListItem>
      )}
    </List>
  );
}

export default RoleList;

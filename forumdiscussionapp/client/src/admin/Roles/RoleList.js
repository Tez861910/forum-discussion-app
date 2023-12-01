import * as React from 'react';
import {
  List,
  ListItem,
} from '@mui/material';
import RoleListItem from './RoleListItem';

function RoleList({ roles, handleEditRole, handleDeleteRole, handleRoleUserModal }) {
    return (
      <List>
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
          <ListItem>No roles available</ListItem>
        )}
      </List>
    );
  }
  
  
  export default RoleList;
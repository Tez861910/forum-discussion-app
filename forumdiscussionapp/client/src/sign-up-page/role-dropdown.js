import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';

const RoleDropdown = ({ roles, roleId, handleRoleChange, errors }) => {
  const isRolesFetched = Array.isArray(roles) && roles.length > 0;

  return (
    <FormControl fullWidth variant="outlined" margin="normal" className="mb-3">
      <InputLabel htmlFor="roleId">Select User Role</InputLabel>
      <Select
        label="Select User Role"
        id="roleId"
        name="roleId"
        value={roleId}
        onChange={handleRoleChange}
        error={!!errors?.roleId}
        className="rounded-0"
      >
        <MenuItem value="">
          Select a Role
        </MenuItem>
        {isRolesFetched && roles.map((role) => (
          <MenuItem key={role.roleId} value={role.roleId}>
            {role.roleName}
          </MenuItem>
        ))}
      </Select>
      {errors && errors.roleId && (
        <FormHelperText error>{errors.roleId}</FormHelperText>
      )}
    </FormControl>
  );
};

export default RoleDropdown;

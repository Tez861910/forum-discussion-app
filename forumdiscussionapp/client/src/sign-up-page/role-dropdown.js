import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';

const RoleDropdown = ({ roles, value, onChange, error, helperText }) => {
  const isRolesFetched = Array.isArray(roles) && roles.length > 0;

  return (
    <FormControl fullWidth variant="outlined" margin="normal" className="mb-3">
      <InputLabel htmlFor="roleId">Select User Role</InputLabel>
      <Select
        label="Select User Role"
        id="roleId"
        name="roleId"
        value={value}
        error={error}
        onChange={onChange}
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
      {error && error.roleId && (
        <FormHelperText error>{error.roleId}</FormHelperText>
      )}
    </FormControl>
  );
};

export default RoleDropdown;
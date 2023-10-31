import React from 'react';

const RoleDropdown = ({ roles, roleId, handleRoleChange, errors }) => {
  const isRolesFetched = Array.isArray(roles) && roles.length > 0;

  return (
    <div className="mb-3">
      <label htmlFor="roleId">Select User Role</label>
      <select
        name="roleId"
        value={roleId}
        onChange={handleRoleChange}
        className="form-control rounded-0"
      >
        <option value="">Select a Role</option>
        {isRolesFetched && roles.map((role) => (
          <option key={role.roleId} value={role.roleId}>
            {role.roleName} {/* Use "roleName" instead of "RoleName" */}
          </option>
        ))}
      </select>
      {errors && errors.roleId && <span className="text-danger">{errors.roleId}</span>}
    </div>
  );
};

export default RoleDropdown;

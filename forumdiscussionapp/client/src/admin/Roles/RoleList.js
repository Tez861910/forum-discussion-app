import * as React from "react";
import {
  List,
  ListItem,
  TextField,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RoleListItem } from "./RoleListItem";

export function RoleList({
  roles,
  handleEditRole,
  handleDeleteRole,
  handleRoleUserModal,
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%", bgcolor: "#e0deff", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">Role List</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            placeholder="Search roles"
          />
          <IconButton color="primary" size="small" sx={{ ml: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <List>
        {filteredRoles.length > 0 ? (
          filteredRoles.map((role) => (
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
            <Typography variant="body1" color="text.secondary">
              No roles available
            </Typography>
          </ListItem>
        )}
      </List>
    </Box>
  );
}

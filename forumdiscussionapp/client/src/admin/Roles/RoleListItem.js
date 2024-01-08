import * as React from "react";
import {
  ListItem,
  Grid,
  TextField,
  Button,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";

export function RoleListItem({
  role,
  handleEditRole,
  handleDeleteRole,
  handleRoleUserModal,
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [updatedRoleName, setUpdatedRoleName] = React.useState(role.roleName);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveEdit = () => {
    handleEditRole(role.roleId, updatedRoleName);
    setIsEditing(false);
    handleClose();
  };

  return (
    <ListItem key={role.roleId} divider>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={8}>
          <ListItemText
            primary={role.roleName}
            onClick={() => handleRoleUserModal(role.roleId)}
            sx={{ cursor: "pointer", color: "primary.main" }}
          />
        </Grid>
        <Grid item xs={4}>
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="edit"
              color="primary"
              onClick={handleOpen}
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
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: 1 }}
            id="modal-modal-title"
          >
            Edit Role
          </Typography>
          <TextField
            type="text"
            value={updatedRoleName}
            onChange={(e) => setUpdatedRoleName(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            id="modal-modal-description"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              size="small"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSaveEdit}
              size="small"
              sx={{ textTransform: "none" }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </ListItem>
  );
}

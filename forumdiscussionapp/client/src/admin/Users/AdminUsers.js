import * as React from "react";
import { Button, Container, Stack, Typography, Slide } from "@mui/material";
import { UserTable } from "./UserTable";
import { CreateUserDialog } from "./CreateUserDialog";
import { EditUserDialog } from "./EditUserDialog";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { useApi } from "../../home-page/Api";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export function AdminUsers() {
  const [users, setUsers] = React.useState([]);
  const [newUser, setNewUser] = React.useState({
    UserName: "",
    UserEmail: "",
    RoleID: "",
    UserPassword: "",
    Address: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Gender: null,
    AvatarPath: "",
  });
  const [roles, setRoles] = React.useState([]);
  const [genders, setGenders] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [editingUserId, setEditingUserId] = React.useState(null);
  const [updatedUserData, setUpdatedUserData] = React.useState({
    UserName: "",
    UserEmail: "",
    RoleID: "",
    UserPassword: "",
    Address: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Gender: null,
    AvatarPath: "",
  });
  const [deleteConfirmation, setDeleteConfirmation] = React.useState({
    open: false,
    userId: null,
  });
  const [createUserModalOpen, setCreateUserModalOpen] = React.useState(false);

  const { api } = useApi();

  const fetchUsers = React.useCallback(async () => {
    try {
      const response = await api.get("/users/users/get");
      setUsers(response.data.users);
      console.log("Users fetched successfully");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [api]);

  const fetchRoles = React.useCallback(async () => {
    try {
      const response = await api.get("/users/roles/get");
      setRoles(response.data.roles);
      console.log("Roles fetched successfully");
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, [api]);

  React.useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchRoles]);

  const handleCreateUser = React.useCallback(async () => {
    if (
      !newUser.UserName ||
      !newUser.UserEmail ||
      newUser.RoleID === "" ||
      newUser.DateOfBirth === ""
    ) {
      console.error("Name, email, roleId, and date of birth are required.");
      return;
    }

    try {
      const response = await api.post("/users/users/create", {
        name: newUser.UserName,
        email: newUser.UserEmail,
        password: newUser.UserPassword,
        roleId: newUser.RoleID,
        address: newUser.Address,
        phoneNumber: newUser.PhoneNumber,
        dateOfBirth: newUser.DateOfBirth,
        genderId: newUser.Gender ? newUser.Gender.GenderID : null,
        avatarPath: newUser.AvatarPath,
      });

      if (
        response.data &&
        response.data.message === "User created successfully"
      ) {
        console.log("User created successfully");
        setNewUser({
          UserName: "",
          UserEmail: "",
          UserPassword: "",
          RoleID: "",
          Address: "",
          PhoneNumber: "",
          DateOfBirth: "",
          GenderID: "",
          AvatarPath: "",
        });

        await fetchUsers();
        setCreateUserModalOpen(false);
      } else {
        console.error("Error creating user:", response.data);
        setCreateUserModalOpen(false);
        if (response.data && response.data.error) {
          setError(response.data.error);
        } else {
          setError("Error creating user. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }, [api, fetchUsers, newUser, setCreateUserModalOpen]);

  const handleEditUser = (user) => {
    setEditingUserId(user.UserID);
    setUpdatedUserData({
      UserName: user.UserName,
      UserEmail: user.UserEmail,
      RoleID: user.RoleID,
      UserPassword: "",
    });
  };

  const handleUpdateUser = React.useCallback(async () => {
    if (
      !updatedUserData.UserName ||
      !updatedUserData.UserEmail ||
      updatedUserData.RoleID === ""
    ) {
      setEditingUserId(null);
      return;
    }

    if (editingUserId === null || editingUserId === undefined) {
      console.error("Invalid user ID for update");
      return;
    }

    try {
      const editedFields = {};
      Object.keys(updatedUserData).forEach((key) => {
        if (
          updatedUserData[key] !== null &&
          updatedUserData[key] !== undefined
        ) {
          editedFields[key] = updatedUserData[key];
        }
      });

      const response = await api.put(
        `/users/users/update/${editingUserId}`,
        editedFields
      );

      if (
        response.data &&
        response.data.message === "User updated successfully"
      ) {
        console.log("User updated successfully");
        setEditingUserId(null);
        setUpdatedUserData({
          UserName: "",
          UserEmail: "",
          RoleID: "",
          UserPassword: "",
        });
        await fetchUsers();
      } else {
        console.error("Error updating user:", response.data);
        if (response.data && response.data.error) {
          setError(response.data.error);
        } else {
          setError("Error updating user. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }, [api, fetchUsers, updatedUserData, editingUserId]);

  const handleDeleteUser = (userId) => {
    setDeleteConfirmation({ open: true, userId });
  };

  const confirmDelete = React.useCallback(async () => {
    try {
      const response = await api.delete(
        `/users/users/delete/${deleteConfirmation.userId}`
      );

      if (
        response.data &&
        response.data.message === "User deleted successfully"
      ) {
        console.log("User deleted successfully");
        setDeleteConfirmation({ open: false, userId: null });
        await fetchUsers();
      } else {
        console.error("Error deleting user:", response.data);
        if (response.data && response.data.error) {
          setError(response.data.error);
        } else {
          setError("Error deleting user. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }, [api, deleteConfirmation, fetchUsers]);

  const handleInputChange = (key, value) => {
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const getRoleName = (roleID) => {
    const role = roles.find((r) => r.roleId === roleID);
    return role ? role.roleName : "N/A";
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, backgroundColor: "#afabff", minHeight: "100vh" }}
    >
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ color: "text.primary" }}
      >
        Admin User Management
      </Typography>
      <Stack
        spacing={2}
        sx={{
          p: 2,
          overflowY: "scroll",
          maxHeight: "100vh",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            outline: "1px solid slategrey",
          },
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginBottom: 2 }}
          onClick={() => setCreateUserModalOpen(true)}
        >
          Create
        </Button>
        <UserTable
          key={users.length}
          users={users}
          handleEditUser={handleEditUser}
          handleDeleteUser={handleDeleteUser}
          getRoleName={getRoleName}
        />
      </Stack>
      <CreateUserDialog
        open={createUserModalOpen}
        handleClose={() => setCreateUserModalOpen(false)}
        handleCreateUser={handleCreateUser}
        newUser={newUser}
        setNewUser={setNewUser}
        roles={roles}
        genders={genders}
        setGenders={setGenders}
        TransitionComponent={Transition}
      />
      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        handleClose={() => setDeleteConfirmation({ open: false, userId: null })}
        handleDelete={confirmDelete}
        TransitionComponent={Transition}
      />
      <EditUserDialog
        open={editingUserId !== null}
        handleClose={() => setEditingUserId(null)}
        handleUpdateUser={handleUpdateUser}
        updatedUserData={updatedUserData}
        handleInputChange={handleInputChange}
        roles={roles}
        TransitionComponent={Transition}
      />
    </Container>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Slide,
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Typography,
  Box,
  IconButton,
  Divider,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useApi } from "../../home-page/Api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledAutocomplete = styled(Autocomplete)({
  marginBottom: 2,
});

const StyledList = styled(List)({
  maxHeight: 300,
  overflow: "auto",
});

const StyledButton = styled(Button)({
  marginLeft: 2,
});

export function CourseUserModal({ onClose, selectedCourseId, open }) {
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [removeConfirmation, setRemoveConfirmation] = useState({
    open: false,
    user: null,
  });
  const [noEnrollmentsFound, setNoEnrollmentsFound] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedEnrolledUserIds, setSelectedEnrolledUserIds] = useState([]);
  const [selectedAutocompleteUserIds, setSelectedAutocompleteUserIds] =
    useState([]);
  const [autocompleteValue, setAutocompleteValue] = useState([]);
  const { api } = useApi();

  useEffect(() => {
    if (open) {
      fetchCourseEnrollments();
      fetchAllUsers();
    }
  }, [api, open, selectedCourseId]);

  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await api.get("/users/users/get");
      if (response.data && Array.isArray(response.data.users)) {
        setAllUsers(response.data.users);
      } else {
        console.error("Invalid response data format (Users):", response.data);
        setAllUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [api]);

  const fetchCourseEnrollments = useCallback(async () => {
    try {
      const response = await api.get(
        `/users/usercourses/enrollments/${selectedCourseId}`
      );

      if (response.status === 404) {
        console.error(
          "No enrollments found for the course:",
          response.data.error
        );
        setEnrolledUsers([]);
        return;
      }

      if (response.data && Array.isArray(response.data.enrollments)) {
        const enrollmentsData = response.data.enrollments;
        const enrolledUsersArray = enrollmentsData.map((user) => ({
          UserID: user.UserID,
          UserName: user.UserName,
        }));

        setEnrolledUsers(enrolledUsersArray);
        setNoEnrollmentsFound(false);
      } else {
        console.error(
          "Invalid response data format for course enrollments:",
          response.data
        );
        setEnrolledUsers([]);
        setNoEnrollmentsFound(true);
      }
    } catch (error) {
      console.error("Error fetching course enrollments:", error);
    }
  }, [api, selectedCourseId]);

  const handleAddUserToCourse = useCallback(async () => {
    try {
      if (selectedAutocompleteUserIds.length === 0) {
        console.error("No users selected. Cannot enroll.");
        return;
      }
      const response = await api.post(
        `/users/usercourses/${selectedCourseId}/enroll`,
        {
          courseId: selectedCourseId,
          userIds: selectedAutocompleteUserIds,
        }
      );
      console.log("Enroll Users Response:", response.data);
      fetchCourseEnrollments();
      setSelectedAutocompleteUserIds([]);
      setAutocompleteValue([]);
    } catch (error) {
      console.error("Error enrolling users in the course:", error);
    }
  }, [
    api,
    fetchCourseEnrollments,
    selectedCourseId,
    selectedAutocompleteUserIds,
  ]);

  const handleRemoveSelected = useCallback(async () => {
    if (selectedEnrolledUserIds.length === 0) {
      console.error("No users selected for removal.");
      return;
    }
    try {
      const response = await api.patch(
        `/users/usercourses/${selectedCourseId}/enrollments`,
        {
          userIds: selectedEnrolledUserIds,
        }
      );
      console.log("API response:", response);
      fetchCourseEnrollments();
    } catch (error) {
      console.error("Error removing users from the course:", error);
    } finally {
      setSelectedEnrolledUserIds([]);
    }
  }, [api, fetchCourseEnrollments, selectedCourseId, selectedEnrolledUserIds]);

  const handleRemoveUserConfirmation = (user) => {
    setRemoveConfirmation({ open: true, user });
  };

  const confirmRemoveUser = useCallback(async () => {
    try {
      if (!removeConfirmation.user || !removeConfirmation.user.UserID) {
        console.error(
          "Invalid user selected for removal",
          removeConfirmation.user
        );
        return;
      }
      const userId = removeConfirmation.user.UserID;
      const response = await api.patch(
        `/users/usercourses/${selectedCourseId}/enrollments/${userId}`
      );
      console.log("API response:", response);
      fetchCourseEnrollments();
    } catch (error) {
      console.error("Error removing user from the course:", error);
    } finally {
      setRemoveConfirmation({ open: false, user: null });
    }
  }, [api, fetchCourseEnrollments, removeConfirmation, selectedCourseId]);

  const cancelRemoveUser = () => {
    setRemoveConfirmation({ open: false, user: null });
  };

  const handleUserCheckboxChange = (userId) => {
    setSelectedEnrolledUserIds((prevSelectedUserIds) => {
      if (prevSelectedUserIds.includes(userId)) {
        // User is already selected, so remove them
        return prevSelectedUserIds.filter((id) => id !== userId);
      } else {
        // User is not selected, so add them
        return [...prevSelectedUserIds, userId];
      }
    });
  };

  const filteredEnrolledUsers = enrolledUsers.filter((user) =>
    user.UserName.toLowerCase().includes(searchText.toLowerCase())
  );

  const nonEnrolledUsers = allUsers.filter(
    (user) =>
      !enrolledUsers.some((enrolledUser) => enrolledUser.UserID === user.UserID)
  );

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
      PaperProps={{
        sx: {
          borderRadius: 16,
          p: 4,
          minWidth: 400,
          backgroundColor: "#f3f2f1",
        },
      }}
    >
      <DialogTitle
        id="user-modal-title"
        sx={{ textAlign: "center", mb: 3, color: "#5c6bc0" }}
      >
        Users in Course
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Search Enrolled Users"
          variant="outlined"
          fullWidth
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ mb: 2, color: "#3949ab" }}
        />
        <StyledList>
          {filteredEnrolledUsers.length > 0 ? (
            filteredEnrolledUsers.map((user) => (
              <React.Fragment key={user.UserID}>
                <ListItem button>
                  <Checkbox
                    edge="start"
                    checked={selectedEnrolledUserIds.includes(user.UserID)}
                    tabIndex={-1}
                    disableRipple
                    onChange={() => handleUserCheckboxChange(user.UserID)}
                    sx={{ color: "#3f51b5" }}
                  />
                  <ListItemText
                    primary={user.UserName}
                    sx={{ color: "#303f9f" }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      size="small"
                      onClick={() => handleRemoveUserConfirmation(user)}
                      sx={{ color: "secondary.main" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography sx={{ color: "#283593" }}>
              No matching users found.
            </Typography>
          )}
        </StyledList>
      </DialogContent>
      <DialogContent>
        <StyledAutocomplete
          options={nonEnrolledUsers ?? []}
          getOptionLabel={(option) => option?.UserName || ""}
          isOptionEqualToValue={(option, value) =>
            option?.UserID === value?.UserID
          }
          onChange={(event, value) => {
            setAutocompleteValue(value);
            setSelectedAutocompleteUserIds(value.map((user) => user.UserID));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add Users"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ color: "#1a237e" }}
            />
          )}
          value={autocompleteValue}
          multiple
          renderOption={(props, option) => (
            <ListItem {...props}>
              <Box sx={{ color: "#1a237e" }}>{option?.UserName}</Box>
            </ListItem>
          )}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          size="small"
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddUserToCourse}
          size="small"
        >
          Enroll Users
        </Button>
        {selectedEnrolledUserIds.length > 0 && (
          <StyledButton
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleRemoveSelected}
          >
            Remove Selected
          </StyledButton>
        )}
      </DialogActions>
      <Dialog
        open={removeConfirmation.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={cancelRemoveUser}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            borderRadius: 16,
            p: 4,
            minWidth: 400,
            backgroundColor: "#f3f2f1",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            textAlign: "center",
            bgcolor: "#5c6bc0",
            color: "common.white",
            py: 2,
          }}
        >
          Confirm Removal
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ textAlign: "center", color: "#3949ab" }}
          >
            Are you sure you want to remove this user from the course?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            bgcolor: "background.default",
            py: 2,
          }}
        >
          <Button
            onClick={cancelRemoveUser}
            color="primary"
            variant="contained"
            sx={{ textTransform: "none", mr: 1, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmRemoveUser}
            color="secondary"
            variant="contained"
            sx={{ textTransform: "none", px: 3 }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}

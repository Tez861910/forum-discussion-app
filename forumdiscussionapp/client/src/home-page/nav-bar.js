import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  ButtonGroup,
  Stack,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { EnrolledCoursesDropdown } from "./enrolled-courses-dropdown";

export const Navbar = ({
  userId,
  roleId,
  onButtonClick,
  selectedCourse,
  isTeacherOrStudent,
  onCourseSelect,
  handleCourseChange,
  handleDrawerToggle,
}) => {
  const theme = useTheme();
  const [activePage, setActivePage] = useState("scheduler");

  useEffect(() => {
    onButtonClick("/home/scheduler", userId, roleId, selectedCourse);
  }, []);

  const getRoleHeaderText = (roleId) => {
    const roleTitles = {
      1: "Admin Home Panel",
      2: "Teacher Home Panel",
      3: "Student Home Panel",
    };
    return roleTitles[roleId] || "Home Panel";
  };

  return (
    <Stack sx={{ marginBottom: 2 }}>
      <AppBar
        position="static"
        sx={{ boxShadow: 2, bgcolor: theme.palette.background.paper }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              edge="start"
              color="secondary"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            {activePage === "scheduler" && (
              <Typography
                variant="h5"
                color="inherit"
                component="div"
                sx={{
                  whiteSpace: "nowrap",
                  mr: 2,
                }}
              >
                {getRoleHeaderText(roleId)}
              </Typography>
            )}
          </Stack>

          {isTeacherOrStudent && (roleId === "2" || roleId === "3") && (
            <EnrolledCoursesDropdown
              onCourseSelect={onCourseSelect}
              onCourseChange={handleCourseChange}
              sx={{ flexGrow: 1, minWidth: "200px" }}
            />
          )}

          <ButtonGroup
            variant="contained"
            color="secondary"
            aria-label="outlined primary button group"
            sx={{
              "& .MuiButton-root": { mx: 1, width: "160px" },
            }}
          >
            <Button
              onClick={() => {
                onButtonClick(
                  "/home/scheduler",
                  userId,
                  roleId,
                  selectedCourse
                );
                setActivePage("scheduler");
              }}
            >
              Scheduler
            </Button>

            {roleId === "1" && (
              <>
                <Button
                  onClick={() =>
                    onButtonClick("/home/admin-courses", userId, selectedCourse)
                  }
                >
                  Manage Courses
                </Button>
                <Button
                  onClick={() =>
                    onButtonClick("/home/admin-users", userId, selectedCourse)
                  }
                >
                  Manage Users
                </Button>
                <Button
                  onClick={() =>
                    onButtonClick("/home/admin-roles", userId, selectedCourse)
                  }
                >
                  Manage Roles
                </Button>
              </>
            )}

            {(roleId === "2" || roleId === "3") && (
              <>
                <Button
                  onClick={() =>
                    onButtonClick(
                      "/home/forum-discussion",
                      userId,
                      selectedCourse
                    )
                  }
                  disabled={!selectedCourse}
                >
                  Forum Discussion
                </Button>

                {isTeacherOrStudent && roleId === "2" && (
                  <Button
                    onClick={() =>
                      onButtonClick("/home/mcq-form", userId, selectedCourse)
                    }
                    disabled={!selectedCourse}
                  >
                    Create MCQ
                  </Button>
                )}
                {isTeacherOrStudent && roleId === "3" && (
                  <Button
                    onClick={() =>
                      onButtonClick(
                        "/home/mcq-answer-form",
                        userId,
                        selectedCourse
                      )
                    }
                    disabled={!selectedCourse}
                  >
                    Answer MCQ
                  </Button>
                )}
              </>
            )}
          </ButtonGroup>
        </Toolbar>

        {(roleId === "2" || roleId === "3") && !selectedCourse && (
          <Alert severity="info">
            <Typography variant="body2">
              Please select a course to enable more options.
            </Typography>
          </Alert>
        )}
      </AppBar>
    </Stack>
  );
};

Navbar.propTypes = {
  userId: PropTypes.string.isRequired,
  roleId: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  selectedCourse: PropTypes.string,
  isTeacherOrStudent: PropTypes.bool.isRequired,
  onCourseSelect: PropTypes.func.isRequired,
  handleCourseChange: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

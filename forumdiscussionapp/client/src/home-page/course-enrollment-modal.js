import React, { useState, useEffect, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import { useApi } from "./Api";

export const CourseEnrollmentModal = ({
  isOpen,
  onRequestClose,
  onEnrollSuccess,
}) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userCourses, setUserCourses] = useState([]);
  const { api } = useApi();

  const fetchCourses = useCallback(async () => {
    try {
      const response = await api.get("/users/courses/get");

      if (response.status === 200) {
        setCourses(response.data.courses);
      } else {
        console.error("Failed to fetch courses:", response.status);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [api]);

  const fetchUserCourses = useCallback(async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User ID not found in local storage");
        return [];
      }

      const response = await api.get("/users/usercourses/get/id", {
        params: { userId: userId },
      });

      if (response.status === 200) {
        return response.data.userCourses;
      } else {
        console.error("Failed to fetch user courses:", response.status);
        return [];
      }
    } catch (error) {
      console.error("Error fetching user courses:", error);
      return [];
    }
  }, [api]);

  const fetchUserCoursesAndSetState = useCallback(async () => {
    try {
      const userCoursesData = await fetchUserCourses();

      if (userCoursesData) {
        setUserCourses(userCoursesData);

        const enrolledCourseIds = userCoursesData.map(
          (course) => course.CourseID
        );
        setSelectedCourses(enrolledCourseIds);
      } else {
        // Handle the case where userCoursesData is undefined or empty
      }
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  }, [fetchUserCourses]);

  useEffect(() => {
    const fetchCoursesAndUserCourses = async () => {
      await Promise.all([fetchCourses(), fetchUserCoursesAndSetState()]);
    };

    if (isOpen) {
      fetchCoursesAndUserCourses();
    }
  }, [isOpen, fetchCourses, fetchUserCoursesAndSetState]);

  const handleCourseSelection = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleEnroll = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }

      const response = await api.post("/users/usercourses/enroll", {
        userId: userId,
        courseIds: selectedCourses,
      });

      if (response.status === 200) {
        // If enrollment is successful
        onEnrollSuccess(selectedCourses);
        fetchUserCoursesAndSetState();
        // Do not close the modal on enrollment
      } else {
        console.error("Enrollment failed:", response.status);
      }
    } catch (error) {
      console.error("Error enrolling in courses:", error);
    }
  };

  const enrolledCoursesList = userCourses
    .map((userCourse) => {
      const enrolledCourse = courses.find(
        (course) => course.CourseID === userCourse.CourseID
      );

      if (enrolledCourse) {
        return enrolledCourse;
      } else {
        return null;
      }
    })
    .filter(
      (course, index, self) =>
        course &&
        index === self.findIndex((c) => c.CourseID === course.CourseID)
    );

  const selectableCoursesList = courses
    .filter((course) => !selectedCourses.includes(course?.CourseID))
    .filter((course) =>
      course?.CourseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Dialog
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="course-enrollment-modal-title"
      aria-describedby="course-enrollment-modal-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="course-enrollment-modal-title">
        Course Enrollment
      </DialogTitle>
      <DialogContent dividers>
        {enrolledCoursesList.length > 0 && (
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Enrolled Courses</Typography>
            <List>
              {enrolledCoursesList.map((enrolledCourse) => (
                <ListItem key={enrolledCourse.CourseID} disablePadding>
                  <ListItemText primary={enrolledCourse.CourseName} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Autocomplete
          multiple
          id="add-course-autocomplete"
          options={selectableCoursesList ?? []}
          getOptionLabel={(option) => option?.CourseName || ""}
          isOptionEqualToValue={(option, value) =>
            option?.CourseID === value?.CourseID
          }
          onChange={(event, value) => {
            setSelectedCourses(value.map((course) => course.CourseID));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add Courses"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ marginBottom: 2 }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
          value={selectableCoursesList.filter((course) =>
            selectedCourses.includes(course?.CourseID)
          )}
          renderOption={(props, option) => (
            <ListItem {...props} disablePadding>
              <Checkbox
                checked={selectedCourses.includes(option?.CourseID)}
                onChange={() => handleCourseSelection(option?.CourseID)}
              />
              <ListItemText primary={option?.CourseName} />
            </ListItem>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleEnroll}
          sx={{ marginRight: 2 }}
        >
          Enroll
        </Button>
        <Button variant="outlined" onClick={onRequestClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
import { CourseListItem } from "./CourseListItem";

export function CourseList({
  courses,
  handleEditCourse,
  handleDeleteCourse,
  handleCourseUserModal,
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.CourseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%", bgcolor: "#fff0de", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">Course List</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            placeholder="Search courses"
          />
          <IconButton color="primary" size="small" sx={{ ml: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <List>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseListItem
              key={course.CourseID}
              course={course}
              handleEditCourse={handleEditCourse}
              handleDeleteCourse={handleDeleteCourse}
              handleCourseUserModal={handleCourseUserModal}
            />
          ))
        ) : (
          <ListItem>
            <Typography variant="body1" color="text.secondary">
              No courses available
            </Typography>
          </ListItem>
        )}
      </List>
    </Box>
  );
}

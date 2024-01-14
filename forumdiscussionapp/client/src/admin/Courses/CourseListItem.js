import * as React from "react";
import {
  ListItem,
  Grid,
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import { EditCourseDialog } from "./EditCourseDialog";

export function CourseListItem({
  course,
  handleEditCourse,
  handleDeleteCourse,
  handleCourseUserModal,
}) {
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [updatedCourseName, setUpdatedCourseName] = React.useState(
    String(course.CourseName)
  );
  const [updatedCourseDescription, setUpdatedCourseDescription] =
    React.useState(String(course.CourseDescription));

  const handleOpenEditDialog = () => setOpenEditDialog(true);
  const handleCloseEditDialog = () => setOpenEditDialog(false);

  const handleSaveEdit = () => {
    try {
      console.log(
        "Save Edit - Name:",
        updatedCourseName,
        "Description:",
        updatedCourseDescription
      );
      handleEditCourse(
        course.CourseID,
        String(updatedCourseName),
        String(updatedCourseDescription)
      );
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error saving edit:", error);
    }
  };

  return (
    <>
      <ListItem key={course.CourseID} divider>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={8}>
            <div onClick={() => handleCourseUserModal(course.CourseID)}>
              <Typography variant="h6">{course.CourseName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {course.CourseDescription}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                color="primary"
                onClick={handleOpenEditDialog}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                color="secondary"
                onClick={() => handleDeleteCourse(course.CourseID)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="users"
                onClick={() => handleCourseUserModal(course.CourseID)}
                size="small"
              >
                <GroupIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </Grid>
        </Grid>
      </ListItem>
      <EditCourseDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        handleSaveEdit={(updatedName, updatedDescription) =>
          handleSaveEdit(
            course.CourseID,
            String(updatedName),
            String(updatedDescription)
          )
        }
        updatedCourseName={String(updatedCourseName)}
        setUpdatedCourseName={setUpdatedCourseName}
        updatedCourseDescription={String(updatedCourseDescription)}
        setUpdatedCourseDescription={setUpdatedCourseDescription}
      />
    </>
  );
}

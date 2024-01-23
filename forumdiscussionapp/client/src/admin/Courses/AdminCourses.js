import * as React from "react";
import {
  Typography,
  CircularProgress,
  Container,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { CourseList } from "./CourseList";
import { CreateCourseSection } from "./CreateCourseSection";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog2";
import { CourseUserModal } from "./CourseUserModal";
import { useApi } from "../../home-page/Api";

export function AdminCourses() {
  const [courses, setCourses] = React.useState([]);
  const [newCourseName, setNewCourseName] = React.useState("");
  const [newCourseDescription, setNewCourseDescription] = React.useState("");
  const [deleteConfirmation, setDeleteConfirmation] = React.useState({
    open: false,
    courseId: null,
  });
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const [selectedCourseId, setSelectedCourseId] = React.useState(null);
  const userId = localStorage.getItem("userId");

  const { api } = useApi();

  const fetchCourses = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/courses/get");
      if (Array.isArray(response.data.courses)) {
        const transformedCourses = response.data.courses.map((row) => ({
          CourseID: row.CourseID,
          CourseName: row.CourseName,
          CourseDescription: row.CourseDescription,
        }));
        setCourses(transformedCourses);
      } else {
        console.error("Invalid response data format (Courses):", response.data);
        setError("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Error fetching courses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  React.useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleCreateCourse = async () => {
    try {
      const response = await api.post("/users/courses/create", {
        courseName: newCourseName,
        courseDescription: newCourseDescription,
        createdByUserID: userId,
      });

      console.log("Create Course Response:", response.data);
      setNewCourseName("");
      setNewCourseDescription("");
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
      setError("Error creating course. Please try again.");
    }
  };

  const handleEditCourse = async (
    courseId,
    updatedCourseName,
    updatedCourseDescription
  ) => {
    try {
      console.log(
        "Edit Course - CourseID:",
        courseId,
        "Name:",
        updatedCourseName,
        "Description:",
        updatedCourseDescription
      );

      const response = await api.put(`/users/courses/update/${courseId}`, {
        courseName: updatedCourseName,
        courseDescription: updatedCourseDescription,
        updatedByUserID: userId,
      });

      console.log("Edit Course Response:", response.data);
      setError(null);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
      setError("Error updating course. Please try again.");
      throw error;
    }
  };

  const handleDeleteCourse = async (courseId) => {
    setDeleteConfirmation({ open: true, courseId });
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/users/courses/patch/${deleteConfirmation.courseId}`, {
        deletedByUserID: userId,
      });

      console.log("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      setError("Error deleting course. Please try again.");
    } finally {
      setDeleteConfirmation({ open: false, courseId: null });
    }
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmation({ open: false, courseId: null });
  };

  const handleCourseUserModal = (courseId) => {
    setSelectedCourseId(courseId);
    setUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setUserModalOpen(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, backgroundColor: "#ffd9ab", minHeight: "100vh" }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Admin Courses Management
      </Typography>
      {error && (
        <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
      {loading && <CircularProgress sx={{ marginBottom: 2 }} />}
      <Stack spacing={2}>
        <CreateCourseSection
          handleCreateCourse={handleCreateCourse}
          newCourseName={newCourseName}
          setNewCourseName={setNewCourseName}
          newCourseDescription={newCourseDescription}
          setNewCourseDescription={setNewCourseDescription}
        />
        <CourseList
          courses={courses}
          handleEditCourse={handleEditCourse}
          handleDeleteCourse={handleDeleteCourse}
          handleCourseUserModal={handleCourseUserModal}
        />
      </Stack>
      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        handleClose={handleDeleteConfirmationClose}
        handleConfirmDelete={handleConfirmDelete}
      />
      {userModalOpen && (
        <CourseUserModal
          onClose={handleCloseUserModal}
          selectedCourseId={selectedCourseId}
          open={userModalOpen}
        />
      )}
    </Container>
  );
}

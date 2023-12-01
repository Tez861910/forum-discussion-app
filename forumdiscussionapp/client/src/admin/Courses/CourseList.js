import React from 'react';
import { List, ListItem } from '@mui/material';
import CourseListItem from './CourseListItem';

function CourseList({ courses, handleEditCourse, handleDeleteCourse, handleCourseUserModal }) {
  return (
    <List>
      {courses.length > 0 ? (
        courses.map((course) => (
          <CourseListItem
            key={course.CourseID}
            course={course}
            handleEditCourse={handleEditCourse}
            handleDeleteCourse={handleDeleteCourse}
            handleCourseUserModal={handleCourseUserModal}
          />
        ))
      ) : (
        <ListItem>No courses available</ListItem>
      )}
    </List>
  );
}

export default CourseList;

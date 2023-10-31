import React from 'react';

const CourseDropdown = ({ courses, courseId, handleCourseChange, errors }) => {
  const isCoursesFetched = Array.isArray(courses) && courses.length > 0;

  return (
    <div className="mb-3">
      <label htmlFor="courseId">Select User Course</label>
      <select
        name="courseId"
        value={courseId}  
        onChange={handleCourseChange} 
        className="form-control rounded-0"
      >
        <option value="">Select a Course</option>
        {isCoursesFetched && courses.map((course) => (
          <option key={course.CourseID} value={course.CourseID}>
            {course.CourseName}
          </option>
        ))}
      </select>
      {errors && errors.courseId && <span className="text-danger">{errors.courseId}</span>}
    </div>
  );
};

export default CourseDropdown;

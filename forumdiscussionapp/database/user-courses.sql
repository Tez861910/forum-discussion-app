-- UserCourses Table
CREATE TABLE UserCourses (
    UserCourseID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    CourseID INT,
    EnrollmentDate DATE,
    CommonAttributeID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_user_id_usercourses (UserID),
    INDEX idx_course_id_usercourses (CourseID),
    INDEX idx_common_attribute_id_usercourses (CommonAttributeID)
);

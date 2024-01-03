-- Threads Table
CREATE TABLE Threads (
    ThreadID INT IDENTITY(1,1) PRIMARY KEY,
    ThreadTitle VARCHAR(255) NOT NULL,
    ThreadContent TEXT NOT NULL,
    Views INT DEFAULT 0,
    UserID INT,
    CourseID INT,
    CommonAttributeID INT,
    INDEX idx_user_id_threads (UserID),
    INDEX idx_course_id_threads (CourseID),
    INDEX idx_common_attribute_id_threads (CommonAttributeID)
);

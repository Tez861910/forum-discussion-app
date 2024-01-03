-- Exam Table
CREATE TABLE Exam (
    ExamID INT IDENTITY(1,1) PRIMARY KEY,
    ExamName VARCHAR(255) NOT NULL,
    ExamStatus VARCHAR(50),
    ExamDuration INT,  -- Removed UNSIGNED
    Instructions TEXT,
    CourseID INT,  -- Removed UNSIGNED
    CommonAttributeID INT,
    CreatedByUserID INT,
    FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_created_by_user_id_exam (CreatedByUserID),
    INDEX idx_common_attribute_id_exam (CommonAttributeID)
);

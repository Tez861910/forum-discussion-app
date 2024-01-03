-- Events table
CREATE TABLE Events (
    EventID INT IDENTITY(1,1) PRIMARY KEY,
    EventTitle VARCHAR(255) NOT NULL,
    EventDescription TEXT,
    EventDate DATETIME NOT NULL,
    Location VARCHAR(255),
    UserID INT,
    CourseID INT,
    CommonAttributeID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_user_id_events (UserID),
    INDEX idx_course_id_events (CourseID),
    INDEX idx_common_attribute_id_events (CommonAttributeID)
);

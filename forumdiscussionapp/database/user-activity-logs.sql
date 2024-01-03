-- UserActivityLog Table
CREATE TABLE UserActivityLog (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    ActivityType VARCHAR(50) NOT NULL,
    ActivityDetails TEXT,
    IPAddress VARCHAR(50),
    CommonAttributeID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_user_id_useractivitylog (UserID)
);

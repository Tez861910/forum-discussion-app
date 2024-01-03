-- Notifications Table
CREATE TABLE Notifications (
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    NotificationContent TEXT NOT NULL,
    ActionType NVARCHAR(50),
    ActionLink NVARCHAR(255),
    IsRead BIT DEFAULT 0,
    CommonAttributeID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_user_id_notifications (UserID),
    INDEX idx_common_attribute_id_notifications (CommonAttributeID)
);

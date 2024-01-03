-- Announcements Table
CREATE TABLE Announcements (
    AnnouncementID INT IDENTITY(1,1) PRIMARY KEY,
    AnnouncementTitle NVARCHAR(255) NOT NULL,
    AnnouncementContent TEXT NOT NULL,
    ExpiryDate DATETIME,
    CreatedByUserID INT,
    CommonAttributeID INT,
    FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_created_by_user_id_announcements (CreatedByUserID),
    INDEX idx_common_attribute_id_announcements (CommonAttributeID)
);

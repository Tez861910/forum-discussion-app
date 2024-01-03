-- UserSettings Table
CREATE TABLE UserSettings (
    SettingID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    Theme VARCHAR(50),
    DarkMode BIT DEFAULT 0,
    Language VARCHAR(50),
    EmailNotifications BIT DEFAULT 1,
    CommonAttributeID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_user_id_user_settings (UserID),
    INDEX idx_common_attribute_id_user_settings (CommonAttributeID)
);

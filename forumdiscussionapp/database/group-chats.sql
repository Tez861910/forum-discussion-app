-- GroupChat table for managing group chats
CREATE TABLE GroupChat (
    GroupID INT IDENTITY(1,1) PRIMARY KEY,
    GroupName VARCHAR(255) NOT NULL,
    Description TEXT,
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CreatorUserID INT,
    IsPublic BIT DEFAULT 1,
    MaxMembers INT,
    IsActive BIT DEFAULT 1,
    Category VARCHAR(100),
    CoverPhotoURL VARCHAR(255),
    WelcomeMessage TEXT,
    ModeratorUserID INT,
    UNIQUE (GroupName),
    CommonAttributeID INT,
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_creator_user_id_groupchat (CreatorUserID),
    INDEX idx_moderator_user_id_groupchat (ModeratorUserID),
    INDEX idx_common_attribute_id_groupchat (CommonAttributeID)
);

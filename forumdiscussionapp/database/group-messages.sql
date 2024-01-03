-- GroupMessages table for storing messages in group chats
CREATE TABLE GroupMessages (
    MessageID INT IDENTITY(1,1) PRIMARY KEY,
    GroupID INT,
    SenderID INT,
    MessageContent TEXT NOT NULL,
    IsRead BIT DEFAULT 0,
    IsArchived BIT DEFAULT 0,
    CommonAttributeID INT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (GroupID) REFERENCES GroupChat(GroupID),
    FOREIGN KEY (SenderID) REFERENCES Users(UserID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_group_id_groupmessages (GroupID),
    INDEX idx_sender_id_groupmessages (SenderID),
    INDEX idx_common_attribute_id_groupmessages (CommonAttributeID)
);

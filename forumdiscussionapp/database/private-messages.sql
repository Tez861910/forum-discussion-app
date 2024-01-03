-- PrivateMessages table for private messaging
CREATE TABLE PrivateMessages (
    MessageID INT IDENTITY(1,1) PRIMARY KEY,
    SenderID INT,
    ReceiverID INT,
    MessageContent TEXT NOT NULL,
    IsRead BIT DEFAULT 0,
    IsArchived BIT DEFAULT 0,
    CommonAttributeID INT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (SenderID) REFERENCES Users(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES Users(UserID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_sender_id_privatemessages (SenderID),
    INDEX idx_receiver_id_privatemessages (ReceiverID),
    INDEX idx_common_attribute_id_privatemessages (CommonAttributeID)
);

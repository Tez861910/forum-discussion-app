-- GroupMembers table for associating users with groups
CREATE TABLE GroupMembers (
    GroupID INT,
    UserID INT,
    CommonAttributeID INT,
    PRIMARY KEY (GroupID, UserID),
    FOREIGN KEY (GroupID) REFERENCES GroupChat(GroupID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_group_id_groupmembers (GroupID),
    INDEX idx_user_id_groupmembers (UserID),
    INDEX idx_common_attribute_id_groupmembers (CommonAttributeID)
);

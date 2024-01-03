-- ForumsModerators Table
CREATE TABLE ForumsModerators (
    ForumModeratorID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    ForumID INT,
    CommonAttributeID INT,
    PromotedAt DATETIME,
    INDEX idx_user_id_forummoderators (UserID),
    INDEX idx_forum_id_forummoderators (ForumID),
    INDEX idx_common_attribute_id_forummoderators (CommonAttributeID)
);

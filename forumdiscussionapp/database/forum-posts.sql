-- ForumsPosts Table
CREATE TABLE ForumsPosts (
    ForumPostID INT IDENTITY(1,1) PRIMARY KEY,
    ForumID INT,
    UserID INT,
    PostContent TEXT NOT NULL,
    CommonAttributeID INT,
    INDEX idx_user_id_forumsposts (UserID),
    INDEX idx_forum_id_forumsposts (ForumID),
    INDEX idx_common_attribute_id_forumsposts (CommonAttributeID)
);

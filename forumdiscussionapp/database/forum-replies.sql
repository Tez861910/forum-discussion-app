-- ForumsReplies Table
CREATE TABLE ForumsReplies (
    ForumReplyID INT IDENTITY(1,1) PRIMARY KEY,
    ForumPostID INT,
    UserID INT,
    ReplyContent TEXT NOT NULL,
    CommonAttributeID INT,
    INDEX idx_user_id_forumsreplies (UserID),
    INDEX idx_forumpost_id_forumsreplies (ForumPostID),
    INDEX idx_common_attribute_id_forumsreplies (CommonAttributeID)
);

-- Comments Table
CREATE TABLE Comments (
    CommentID INT IDENTITY(1,1) PRIMARY KEY,
    CommentContent TEXT NOT NULL,
    UserID INT,
    ThreadID INT,
    CommonAttributeID INT,
    INDEX idx_user_id_comments (UserID),
    INDEX idx_thread_id_comments (ThreadID),
    INDEX idx_common_attribute_id_comments (CommonAttributeID)
);

-- ThreadsForums Table
CREATE TABLE ThreadsForums (
    ThreadForumID INT IDENTITY(1,1) PRIMARY KEY,
    ThreadID INT,
    ForumID INT,
    IsPrimary BIT DEFAULT 1,
    CommonAttributeID INT,
    INDEX idx_thread_id_threadsforums (ThreadID),
    INDEX idx_forum_id_threadsforums (ForumID),
    INDEX idx_common_attribute_id_threadsforums (CommonAttributeID)
);

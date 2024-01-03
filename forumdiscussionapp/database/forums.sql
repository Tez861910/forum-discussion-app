-- Forums Table
CREATE TABLE Forums (
    ForumID INT IDENTITY(1,1) PRIMARY KEY,
    ForumName VARCHAR(255) NOT NULL,
    ForumDescription TEXT,
    CreatedByUserID INT,
    CommonAttributeID INT,
    INDEX idx_created_by_user_id_forums (CreatedByUserID),
    INDEX idx_common_attribute_id_forums (CommonAttributeID)
);

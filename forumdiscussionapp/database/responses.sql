-- Responses Table
CREATE TABLE Responses (
    ResponseID INT IDENTITY(1,1) PRIMARY KEY,
    ResponseContent TEXT NOT NULL,
    UserID INT,
    CommentID INT,
    CommonAttributeID INT,
    INDEX idx_user_id_responses (UserID),
    INDEX idx_comment_id_responses (CommentID),
    INDEX idx_common_attribute_id_responses (CommonAttributeID)
);

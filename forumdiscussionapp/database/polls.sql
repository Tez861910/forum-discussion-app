-- Polls Table
CREATE TABLE Polls (
    PollID INT IDENTITY(1,1) PRIMARY KEY,
    PollQuestion TEXT NOT NULL,
    CreatedByUserID INT,
    CommonAttributeID INT,
    INDEX idx_created_by_user_id_polls (CreatedByUserID),
    INDEX idx_common_attribute_id_polls (CommonAttributeID)
);

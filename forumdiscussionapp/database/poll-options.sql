-- PollOptions Table
CREATE TABLE PollOptions (
    PollOptionID INT IDENTITY(1,1) PRIMARY KEY,
    PollID INT,
    OptionText TEXT NOT NULL,
    CommonAttributeID INT,
    INDEX idx_poll_id_polloptions (PollID),
    INDEX idx_common_attribute_id_polloptions (CommonAttributeID)
);

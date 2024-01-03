-- UserPollVotes Table
CREATE TABLE UserPollVotes (
    UserPollVoteID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    PollOptionID INT,
    CommonAttributeID INT,
    INDEX idx_user_id_userpollvotes (UserID),
    INDEX idx_poll_option_id_userpollvotes (PollOptionID),
    INDEX idx_common_attribute_id_userpollvotes (CommonAttributeID)
);

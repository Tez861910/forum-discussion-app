-- Reactions Table
CREATE TABLE Reactions (
    ReactionID INT IDENTITY(1,1) PRIMARY KEY,
    ReactionByUserID INT,
    ReactionTypeID INT,
    ReactedToType NVARCHAR(20) NOT NULL CHECK (ReactedToType IN ('Thread', 'Comment', 'Response')),
    ReactedToID INT NOT NULL,
    IsPositive BIT DEFAULT 1, -- 1 for True, 0 for False
    CommonAttributeID INT,
    INDEX idx_user_id_reactions (ReactionByUserID),
    INDEX idx_reaction_type_id_attachments (ReactionTypeID),
    INDEX idx_reacted_to_id_reactions (ReactedToID, ReactedToType),
    INDEX idx_common_attribute_id_reactions (CommonAttributeID)
);

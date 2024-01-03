-- ReactionType Table
CREATE TABLE ReactionType (
    ReactionTypeID INT IDENTITY(1,1) PRIMARY KEY,
    ReactionTypeName NVARCHAR(20) NOT NULL CHECK (ReactionTypeName IN ('Like', 'Dislike', 'Love', 'Angry')),
    INDEX idx_reaction_type_name_reactiontype (ReactionTypeName)
);

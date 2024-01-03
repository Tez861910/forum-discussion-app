-- MCQOptions Table
CREATE TABLE MCQOptions (
    MCQOptionID INT IDENTITY(1,1) PRIMARY KEY,
    MCQQuestionID INT NOT NULL,
    MCQOptionText TEXT NOT NULL,
    IsCorrect BIT DEFAULT 0,  -- Changed BOOLEAN to BIT
    CreatedByUserID INT,
    CommonAttributeID INT,
    FOREIGN KEY (MCQQuestionID) REFERENCES Question(QuestionID),
    FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID),
    INDEX idx_mcq_question_id_mcqoptions (MCQQuestionID),
    INDEX idx_common_attribute_id_mcqoptions (CommonAttributeID)
);

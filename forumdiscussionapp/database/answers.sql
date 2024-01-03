-- Answer Table
CREATE TABLE Answer (
    AnswerID INT IDENTITY(1,1) PRIMARY KEY,
    QuestionID INT NOT NULL,
    AnswerText TEXT NOT NULL,
    CreatedByUserID INT,
    CommonAttributeID INT,
    FOREIGN KEY (QuestionID) REFERENCES Question(QuestionID),
    FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID),
    INDEX idx_question_id_answers (QuestionID),
    INDEX idx_common_attribute_id_answers (CommonAttributeID)
);

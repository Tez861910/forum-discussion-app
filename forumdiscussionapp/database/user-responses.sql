-- UserResponses Table
CREATE TABLE UserResponses (
    UserResponseID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    QuestionID INT,
    AnswerID INT,
    CommonAttributeID INT,
    FOREIGN KEY (AnswerID) REFERENCES MCQOptions(MCQOptionID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_user_id_userresponses (UserID),
    INDEX idx_question_id_userresponses (QuestionID),
    INDEX idx_answer_id_userresponses (AnswerID),
    INDEX idx_common_attribute_id_userresponses (CommonAttributeID)
);

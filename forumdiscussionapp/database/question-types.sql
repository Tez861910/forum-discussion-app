-- QuestionType Table
CREATE TABLE QuestionType (
    QuestionTypeID INT IDENTITY(1,1) PRIMARY KEY,
    QuestionTypeName VARCHAR(50),
    CommonAttributeID INT,
    INDEX idx_common_attribute_id_questiontype (CommonAttributeID)
);

-- Question Table
CREATE TABLE Question (
    QuestionID INT IDENTITY(1,1) PRIMARY KEY,
    QuestionText TEXT NOT NULL,
    QuestionTypeID INT,
    ExamID INT,
    CourseID INT,
    CreatedByUserID INT,
    CommonAttributeID INT,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    FOREIGN KEY (ExamID) REFERENCES Exam(ExamID),
    FOREIGN KEY (QuestionTypeID) REFERENCES QuestionType(QuestionTypeID),
    FOREIGN KEY (CreatedByUserID) REFERENCES Users(UserID),
    FOREIGN KEY (CommonAttributeID) REFERENCES CommonAttributes(AttributeID),
    INDEX idx_course_id_questions (CourseID),
    INDEX idx_exam_id_questions (ExamID),
    INDEX idx_question_type_id_questions (QuestionTypeID),
    INDEX idx_common_attribute_id_questions (CommonAttributeID)
);
